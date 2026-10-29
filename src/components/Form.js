"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

const labelStyle = { color: "#CCCED1", display: "block", fontFamily: "Poppins, sans-serif", fontSize: "0.75rem", marginBottom: "0.35rem" };
const inputStyle = { background: "transparent", border: "1px solid #637080", borderRadius: "4px", color: "white", fontFamily: "Poppins, sans-serif", fontSize: "0.875rem", padding: "0.7rem 0.8rem", width: "100%" };

function FormField({ label, name, type = "text", placeholder, register, error, rules }) {
  return (
    <label style={{ display: "block", width: "100%" }}>
      <span style={labelStyle}>{label}</span>
      <input {...register(name, rules)} type={type} placeholder={placeholder} aria-invalid={Boolean(error)} style={{ ...inputStyle, borderColor: error ? "#f56565" : inputStyle.borderColor }} />
      {error && <span role="alert" style={{ color: "#fc8181", display: "block", fontSize: "0.75rem", marginTop: "0.25rem" }}>{error.message}</span>}
    </label>
  );
}

export default function Form({ buttonPosition = "absolute" }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ mode: "onSubmit", reValidateMode: "onChange" });
  const onSubmit = async (data) => {
    setShowSuccessMessage(false);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setShowSuccessMessage(true); reset(); }
    } catch (error) { console.error("An error occurred during submission:", error); }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <div style={{ alignItems: "flex-start", display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "1.5rem", position: "relative", width: "100%" }}>
        <FormField label="Name" name="name" placeholder="John Appleseed" register={register} error={errors.name} rules={{ required: "Name is required" }} />
        <FormField label="Email" name="email" type="email" placeholder="john.appleseed@ac.co.uk" register={register} error={errors.email} rules={{ required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } }} />
        <FormField label="Phone Number" name="phoneNumber" placeholder="+447123456789" register={register} error={errors.phoneNumber} rules={{ required: "Phone number is required" }} />
        <FormField label="Message" name="userMessage" placeholder="Leave your message here..." register={register} error={errors.userMessage} rules={{ required: "Message is required" }} />
        {Object.keys(errors).length > 0 && !showSuccessMessage && <p role="alert" style={{ alignSelf: "flex-end", color: "#DB3E00", fontFamily: "Poppins, sans-serif", fontSize: "0.75rem", margin: 0 }}>Please fill in all details and message.</p>}
        {showSuccessMessage && <p style={{ alignSelf: "flex-end", color: "#68d391", fontFamily: "Poppins, sans-serif", fontSize: "0.75rem", margin: 0 }}>Message sent successfully!</p>}
        <button type="submit" disabled={isSubmitting} style={{ background: "#00DEE3", border: "1px solid #00DEE3", bottom: buttonPosition === "absolute" ? 0 : undefined, color: "#000819", cursor: isSubmitting ? "wait" : "pointer", fontFamily: "Poppins, sans-serif", fontWeight: 500, margin: "1rem 2rem 1.5rem auto", padding: "0.7rem 1rem", position: buttonPosition }}>
          {isSubmitting ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
