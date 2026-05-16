"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  contactSchema,
  ContactFormData,
} from "../utils/validation";

import { useContact } from "../hooks/useContact";

import { motion } from "framer-motion";

export default function ContactForm() {
  const { submitContact, loading } =
    useContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (
    data: ContactFormData
  ) => {
    await submitContact(data);
    reset();
  };

  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-14 text-center"
        >
          Contact Us
        </motion.h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* NAME */}
          <InputField
            label="Full Name"
            error={errors.name?.message}
          >
            <input
              {...register("name")}
              className="input"
              placeholder="John Doe"
            />
          </InputField>

          {/* EMAIL */}
          <InputField
            label="Email"
            error={errors.email?.message}
          >
            <input
              {...register("email")}
              className="input"
              placeholder="john@example.com"
            />
          </InputField>

          {/* PHONE */}
          <InputField
            label="Phone"
            error={errors.phone?.message}
          >
            <input
              {...register("phone")}
              className="input"
              placeholder="+91 9876543210"
            />
          </InputField>

          {/* COMPANY */}
          <InputField
            label="Company"
            error={errors.company?.message}
          >
            <input
              {...register("company")}
              className="input"
              placeholder="Company Name"
            />
          </InputField>

          {/* SUBJECT */}
          <InputField
            label="Subject"
            error={errors.subject?.message}
          >
            <input
              {...register("subject")}
              className="input"
              placeholder="Project Inquiry"
            />
          </InputField>

          {/* BUDGET */}
          <InputField
            label="Budget"
            error={errors.budget?.message}
          >
            <select
              {...register("budget")}
              className="input"
            >
              <option value="">
                Select Budget
              </option>

              <option>$500 - $1000</option>
              <option>$1000 - $5000</option>
              <option>$5000+</option>
            </select>
          </InputField>

          {/* PROJECT TYPE */}
          <InputField
            label="Project Type"
            error={errors.projectType?.message}
          >
            <select
              {...register("projectType")}
              className="input"
            >
              <option value="">
                Select Type
              </option>

              <option>Website</option>
              <option>Mobile App</option>
              <option>Dashboard</option>
              <option>UI/UX Design</option>
            </select>
          </InputField>
{/* TIMELINE */}
<InputField
  label="Project Timeline"
  error={errors.timeline?.message}
>
  <select
    {...register("timeline")}
    className="input"
  >
    <option value="">
      Select Timeline
    </option>

    <option>1 Week</option>
    <option>2-4 Weeks</option>
    <option>1-2 Months</option>
    <option>3+ Months</option>
  </select>
</InputField>
          {/* MESSAGE */}
          <div className="md:col-span-2">
            <InputField
              label="Message"
              error={errors.message?.message}
            >
              <textarea
                {...register("message")}
                rows={6}
                className="input"
                placeholder="Tell us about your project..."
              />
            </InputField>
          </div>

          {/* TERMS */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 text-zinc-400">
              <input
                type="checkbox"
                {...register("terms")}
              />

              I agree to terms &
              conditions
            </label>

            <p className="text-red-500 text-sm mt-1">
              {errors.terms?.message}
            </p>
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">
         <motion.button
  whileHover={{
    scale: 1.03,
  }}
  whileTap={{ scale: 0.95 }}
  disabled={loading}
  type="submit"
  className="w-full bg-white text-black py-4 rounded-xl font-semibold cursor-pointer transition-all hover:bg-violet-200 disabled:opacity-50"
>
  {loading
    ? "Sending..."
    : "Send Message"}
</motion.button>
          </div>
        </form>
      </div>
    </section>
  );
}

type InputProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

function InputField({
  label,
  error,
  children,
}: InputProps) {
  return (
    <div>
      <label className="block mb-2 text-zinc-300">
        {label}
      </label>

      {children}

      <p className="text-red-500 text-sm mt-1">
        {error}
      </p>
    </div>
  );
}