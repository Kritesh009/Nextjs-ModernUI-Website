"use client";

import { useState } from "react";

import api from "../lib/axios";

import toast from "react-hot-toast";

export const useContact = () => {
  const [loading, setLoading] =
    useState(false);

  const submitContact = async (
    data: unknown
  ) => {
    try {
      setLoading(true);

      const response = await api.post(
        "/api/contact",
        data
      );

      if (response.data.success) {
        toast.success(
          "Message sent successfully"
        );
      }
    } catch (error) {
      toast.error(
        "Something went wrong"
      );

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    submitContact,
    loading,
  };
};