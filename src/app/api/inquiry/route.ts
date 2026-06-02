import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const missingVariables: string[] = [];
  
  const emailJsServiceId = process.env.EMAILJS_SERVICE_ID;
  const emailJsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
  const emailJsPublicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!emailJsServiceId) missingVariables.push("EMAILJS_SERVICE_ID");
  if (!emailJsTemplateId) missingVariables.push("EMAILJS_TEMPLATE_ID");
  if (!emailJsPublicKey) missingVariables.push("EMAILJS_PUBLIC_KEY");

  try {
    const body = await request.json();
    const { name, email, agency, type, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    // Comprehensive server-side logging of configuration state
    console.log("Inquiry Form Submission Configuration Audit:", {
      serviceIdStatus: emailJsServiceId ? "CONFIGURED" : "MISSING",
      templateIdStatus: emailJsTemplateId ? "CONFIGURED" : "MISSING",
      publicKeyStatus: emailJsPublicKey ? "CONFIGURED" : "MISSING",
      recipientEmail: "kushalnaikk142whiteskyblue@gmail.com",
    });

    if (missingVariables.length > 0) {
      const errorMsg = `EmailJS is not fully configured. Missing environment variables: ${missingVariables.join(", ")}`;
      console.error(errorMsg);
      
      // Fallback: server-to-server FormSubmit.co proxy (keeps the form operational)
      console.log("Attempting server-side fallback to FormSubmit.co...");
      const formSubmitResponse = await fetch("https://formsubmit.co/ajax/kushalnaikk142whiteskyblue@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          "Company/Brand": agency || "N/A",
          "Project Type": type,
          Message: message,
        }),
      });

      if (formSubmitResponse.ok) {
        const data = await formSubmitResponse.json();
        if (data.success === "true" || data.message?.includes("success")) {
          console.log("Fallback FormSubmit.co proxy completed successfully.");
          return NextResponse.json({ 
            success: true, 
            method: "FormSubmit Proxy Fallback",
            warning: "EmailJS was bypassed because it is not configured. Please add the required environment variables to your deployment dashboard."
          });
        }
      }

      return NextResponse.json(
        { 
          success: false, 
          message: "Unable to send inquiry. Please try again later.",
          details: errorMsg,
          missingKeys: missingVariables
        },
        { status: 500 }
      );
    }

    // Call EmailJS REST API
    const emailJsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        service_id: emailJsServiceId,
        template_id: emailJsTemplateId,
        user_id: emailJsPublicKey,
        template_params: {
          // Double-bound template values to support both camelCase and snake_case templates
          name: name,
          email: email,
          company: agency || "N/A",
          projectType: type || "Campaign",
          message: message,
          from_name: name,
          from_email: email,
          company_brand: agency || "N/A",
          project_type: type || "Campaign",
          to_email: "kushalnaikk142whiteskyblue@gmail.com"
        },
      }),
    });

    const responseText = await emailJsResponse.text();
    console.log("EmailJS API response status:", emailJsResponse.status, "body:", responseText);

    if (emailJsResponse.ok) {
      return NextResponse.json({ 
        success: true, 
        method: "EmailJS",
        details: "Email sent successfully via EmailJS."
      });
    } else {
      console.error("EmailJS API rejected request:", responseText);
      return NextResponse.json(
        { 
          success: false, 
          message: "Unable to send inquiry. Please try again later.",
          details: `EmailJS API returned code ${emailJsResponse.status}: ${responseText}`
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Critical server-side inquiry dispatch failure:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Unable to send inquiry. Please try again later.",
        details: error.message || "Internal server error."
      },
      { status: 500 }
    );
  }
}
