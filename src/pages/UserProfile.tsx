import { useState } from "react";
import { useUserStore } from "../contexts/useUserStore";
import { useTranslation } from "react-i18next";

export default function UserProfile() {
  const { t } = useTranslation();
  const {
    firstName,
    lastName,
    email,
    address,
    phone,
    birthday,
    gender,
    updateUserProfile,
  } = useUserStore();

  const [form, setForm] = useState({
    firstName,
    lastName,
    email,
    address,
    addressLine2: "",
    city: "",
    region: "",
    postalcode: "",
    country: "",
    phone,
    birthday,
    gender,
    password: "",
  });

  const [editingEmail, setEditingEmail] = useState(false);
  const [editingAddress, setEditingAddress] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveEmailInfo = () => {
    if (!form.email || !form.password) {
      alert("Email and Password must be filled.");
      return;
    }
    updateUserProfile({ ...form });
    setEditingEmail(false);
  };

  const saveAddressInfo = () => {
    const requiredFields = [
      form.firstName,
      form.lastName,
      form.address,
      form.city,
      form.region,
      form.postalcode,
      form.country,
    ];
    if (requiredFields.some((field) => !field.trim())) {
      alert("Please fill in all required address fields.");
      return;
    }

    updateUserProfile({ ...form });
    setEditingAddress(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("Account Overview")}</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Account Details */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t("Account Details")}</h2>
          {!editingEmail ? (
            <>
              <p className="mb-4 text-gray-600">{email}</p>
              <button
                onClick={() => setEditingEmail(true)}
                className="text-[var(--primary-maroon)] font-medium hover:cursor-pointer"
              >
                {t("Edit")}
              </button>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveEmailInfo();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm">{t("Email")}</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
              <div>
                <label className="block text-sm">{t("Password")}</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingEmail(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                >
                  {t("Cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-[var(--primary-maroon)] text-white px-6 py-2 rounded hover:bg-opacity-90"
                >
                  {t("Save")}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Address Book */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold mb-4">{t("Address Book")}</h2>
          {!editingAddress ? (
            <>
              <p className="mb-2 text-gray-600">
                {address ? address : t("No Address")}
              </p>
              <button
                onClick={() => setEditingAddress(true)}
                className="text-[var(--primary-maroon)] font-medium hover:cursor-pointer"
              >
                {address ? t("Edit Address") : t("Add Address")}
              </button>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveAddressInfo();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm">Full Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
              <div>
                <label className="block text-sm">Address Line 1</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street address, P.O. box, etc."
                  required
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>
              <div>
                <label className="block text-sm">Address Line 2</label>
                <input
                  name="addressLine2"
                  value={form.addressLine2}
                  onChange={handleChange}
                  placeholder="Apartment, suite, unit, etc."
                  className="w-full border px-3 py-2 rounded mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm">State/Province/Region</label>
                  <input
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm">ZIP/Postal Code</label>
                  <input
                    name="postalcode"
                    value={form.postalcode}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm">Country</label>
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingAddress(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                >
                  {t("Cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  {t("Save Address")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
