import { useTranslation } from "react-i18next";
import { useUserStore } from "../contexts/useUserStore";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function UserProfile() {
  const { t } = useTranslation();
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    region,
    postalcode,
    country,
    phone,
    birthday,
    gender,
    updateUserProfile,
  } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      address,
      city,
      region,
      postalcode,
      country,
      phone,
    },
  });

  const onSubmit = (data: any) => {
    updateUserProfile({
      firstName,
      lastName,
      email,
      birthday,
      gender,
      ...data,
    });
    setEditingAddress(false);
  };

  const [editingAddress, setEditingAddress] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        {t("Account Overview")}
      </h1>

      <div className="space-y-8">
        {/* Account Details */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {t("Account Details")}
          </h2>
          {firstName && lastName && (
            <p className="mb-1 text-gray-900 font-medium text-lg">
              {firstName} {lastName}
            </p>
          )}
          <p className="mb-4 text-gray-600">{email}</p>
        </section>

        {/* Address Book */}
        <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {t("Address Book")}
          </h2>
          {!editingAddress ? (
            <>
              <p className="mb-4 text-gray-600">{address || t("No Address")}</p>
              <button
                onClick={() => {
                  setEditingAddress(true);
                  reset({ address, city, region, postalcode, country, phone });
                }}
                className="text-blue-600 font-medium hover:cursor-pointer"
              >
                {address ? t("Edit Address") : t("Add Address")}
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">
                  Address Line
                </label>
                <input
                  {...register("address", { required: "Address is required" })}
                  className="w-full border border-gray-300 px-4 py-2 rounded mt-1"
                />
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700">City</label>
                  <input
                    {...register("city", { required: "City is required" })}
                    className="w-full border border-gray-300 px-4 py-2 rounded mt-1"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Region</label>
                  <input
                    {...register("region", { required: "Region is required" })}
                    className="w-full border border-gray-300 px-4 py-2 rounded mt-1"
                  />
                  {errors.region && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.region.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-700">
                    Postal Code
                  </label>
                  <input
                    {...register("postalcode", {
                      required: "Postal Code is required",
                      pattern: {
                        value: /^[0-9]{3,10}$/,
                        message: "Postal Code must be 3–10 digits",
                      },
                    })}
                    className="w-full border border-gray-300 px-4 py-2 rounded mt-1"
                  />
                  {errors.postalcode && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.postalcode.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Country</label>
                  <input
                    {...register("country", {
                      required: "Country is required",
                    })}
                    className="w-full border border-gray-300 px-4 py-2 rounded mt-1"
                  />
                  {errors.country && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700">
                  Phone (optional)
                </label>
                <input
                  {...register("phone", {
                    pattern: {
                      value: /^[0-9+\-\s]{6,15}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="w-full border border-gray-300 px-4 py-2 rounded mt-1"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingAddress(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 hover:cursor-pointer"
                >
                  {t("Cancel")}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 hover:cursor-pointer"
                >
                  {t("Save Address")}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
