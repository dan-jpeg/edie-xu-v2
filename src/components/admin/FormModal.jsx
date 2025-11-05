// src/components/admin/FormModal.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { uploadImage } from "../../firebase";

const FormModal = ({ type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState(() => {
    const initialData = {
      title: "",
      year: "",
      description: "",
      material: "",
      dimensions: "",
      category: "",
      location: "",
      date: "",
      url: "",
      videoUrl: "",
      safeTitle: "",
      duration: "",
      media: [],
      images: [],
      header: "",
      textContent: "",
      workIncluded: [],
      ...item,
    };
    console.log("FormModal initialized with:", initialData);
    return initialData;
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = () => {
    // Only title is required
    if (!formData.title || formData.title.trim() === "") {
      alert("Please fill in Title (required)");
      return;
    }

    if (saving) return;

    console.log("Submitting form data:", formData);
    console.log("Images:", getImages());

    setSaving(true);
    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    try {
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`Uploading ${i + 1} of ${files.length}...`);
        const url = await uploadImage(files[i], type);
        uploadedUrls.push(url);
      }

      if (type === "works") {
        const newMedia = uploadedUrls.map((url) => ({ type: "image", url }));
        setFormData((prev) => ({
          ...prev,
          media: [...(prev.media || []), ...newMedia],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          images: [...(prev.images || []), ...uploadedUrls],
        }));
      }

      setUploadProgress("Upload complete!");
      setTimeout(() => setUploadProgress(""), 2000);
    } catch (error) {
      alert("Failed to upload images. Make sure Firebase is configured.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    if (type === "works") {
      setFormData((prev) => ({
        ...prev,
        media: prev.media.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const getImages = () => {
    if (type === "works") {
      return (formData.media || [])
        .filter((m) => m.type === "image")
        .map((m) => m.url);
    }
    return formData.images || [];
  };

  return (
    <motion.div
      className="fixed inset-0 bg-white/90 z-[10050] overflow-y-auto"
      data-lenis-prevent
      style={{
        overscrollBehavior: "contain",
        touchAction: "auto",
        WebkitOverflowScrolling: "touch",
      }}
      onClick={onClose}
    >
      <div className="min-h-screen flex justify-center">
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="bg-white   w-full max-w-2xl my-8 overflow-y-auto max-h-[90vh]"
        >
          <div className="  p-6 flex justify-between items-center sticky top-0 bg-white">
            <h2 className="text-[11px] uppercase tracking-wider">
              {item?.id ? "Edit" : "Add New"}{" "}
              {type === "works" ? "Work" : type.slice(0, -1)}
            </h2>
            <button onClick={onClose} className="text-2xl hover:opacity-50">
              &times;
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full bg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className="w-full  bg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
              />
            </div>

            {type === "works" && (
              <>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                    Material
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => handleChange("material", e.target.value)}
                    className="w-fullbg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => handleChange("dimensions", e.target.value)}
                    className="w-full bg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
                  />
                </div>
              </>
            )}

            {type === "videos" && (
              <>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                    Safe Title
                  </label>
                  <input
                    type="text"
                    value={formData.safeTitle}
                    onChange={(e) => handleChange("safeTitle", e.target.value)}
                    className="w-full bg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleChange("duration", e.target.value)}
                    className="w-full bg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                    Video URL
                  </label>
                  <input
                    type="text"
                    value={formData.videoUrl}
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                    className="w-full bg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
                  />
                </div>
              </>
            )}

            {type === "exhibitions" && (
              <>
                <div>
                  <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                    Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full bg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
                    placeholder="YYYY. MM. DD-MM. DD"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                    Header / Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.header}
                    onChange={(e) => handleChange("header", e.target.value)}
                    className="w-full bg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
                    placeholder="Group exhibition with..."
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                    Text Content
                  </label>
                  <textarea
                    value={formData.textContent}
                    onChange={(e) =>
                      handleChange("textContent", e.target.value)
                    }
                    className="w-full  border-black p-2 h-40 text-[11px] focus:outline-none bg-transparent"
                    placeholder="Full exhibition description..."
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full bg-gray-50 border-black p-2 h-24 text-[11px] focus:outline-none bg-transparent"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="w-full bg-gray-50 border-black p-2 text-[11px] focus:outline-none bg-transparent"
              />
            </div>

            {type === "exhibitions" && (
              <div>
                <label className="block text-[9px] uppercase tracking-wider mb-2 text-gray-500">
                  URL
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => handleChange("url", e.target.value)}
                  className="w-full  border-black p-2 text-[11px] focus:outline-none bg-transparent"
                />
              </div>
            )}

            {/* Image Upload */}
            <div className="pt-2 border-t border-black">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-[9px] uppercase tracking-wider text-gray-500">
                  Images
                </label>
                <span className="text-[9px] text-gray-400">
                  {getImages().length} uploaded
                </span>
              </div>

              <div className="mb-4">
                <label className="flex items-center justify-center w-full h-24 border border-dashed border-black hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="text-center">
                    <p className="text-[9px] uppercase tracking-wider">
                      {uploading ? uploadProgress : "+ Add Images"}
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(Array.from(e.target.files))
                    }
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              {getImages().length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {getImages().map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`${index + 1}`}
                        className="w-full h-20 object-cover border border-black"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute inset-0 bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[9px]"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Included Works Section - Moved to after Images */}
            {type === "exhibitions" && (
              <div className="pt-4 border-t border-black">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-[9px] uppercase tracking-wider text-gray-500">
                    Included Works
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const newWork = {
                        id: Date.now(),
                        title: "",
                        year: "",
                        dimensions: "",
                        material: "",
                        description: "",
                      };
                      setFormData((prev) => ({
                        ...prev,
                        workIncluded: [...(prev.workIncluded || []), newWork],
                      }));
                    }}
                    className="text-[9px] px-2 py-1 bg-black bg-opacity-10 hover:bg-black hover:text-white transition-colors rounded-full"
                  >
                    + Add Work
                  </button>
                </div>

                {(formData.workIncluded || []).length > 0 && (
                  <div className="space-y-4">
                    {formData.workIncluded.map((work, index) => (
                      <div
                        key={work.id || index}
                        className="border border-black p-4 space-y-2"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] text-gray-500">
                            Work {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                workIncluded: prev.workIncluded.filter(
                                  (_, i) => i !== index,
                                ),
                              }));
                            }}
                            className="text-[9px] hover:opacity-50"
                          >
                            × Remove
                          </button>
                        </div>

                        <input
                          type="text"
                          placeholder="Title"
                          value={work.title}
                          onChange={(e) => {
                            const newWorkIncluded = [...formData.workIncluded];
                            newWorkIncluded[index] = {
                              ...work,
                              title: e.target.value,
                            };
                            handleChange("workIncluded", newWorkIncluded);
                          }}
                          className="w-full bg-gray-50 p-2 text-[10px] focus:outline-none"
                        />

                        <input
                          type="text"
                          placeholder="Year"
                          value={work.year}
                          onChange={(e) => {
                            const newWorkIncluded = [...formData.workIncluded];
                            newWorkIncluded[index] = {
                              ...work,
                              year: e.target.value,
                            };
                            handleChange("workIncluded", newWorkIncluded);
                          }}
                          className="w-full bg-gray-50 p-2 text-[10px] focus:outline-none"
                        />

                        <input
                          type="text"
                          placeholder="Dimensions"
                          value={work.dimensions}
                          onChange={(e) => {
                            const newWorkIncluded = [...formData.workIncluded];
                            newWorkIncluded[index] = {
                              ...work,
                              dimensions: e.target.value,
                            };
                            handleChange("workIncluded", newWorkIncluded);
                          }}
                          className="w-full bg-gray-50 p-2 text-[10px] focus:outline-none"
                        />

                        <input
                          type="text"
                          placeholder="Material"
                          value={work.material}
                          onChange={(e) => {
                            const newWorkIncluded = [...formData.workIncluded];
                            newWorkIncluded[index] = {
                              ...work,
                              material: e.target.value,
                            };
                            handleChange("workIncluded", newWorkIncluded);
                          }}
                          className="w-full bg-gray-50 p-2 text-[10px] focus:outline-none"
                        />

                        {/*<textarea*/}
                        {/*  placeholder="Description"*/}
                        {/*  value={work.description}*/}
                        {/*  onChange={(e) => {*/}
                        {/*    const newWorkIncluded = [*/}
                        {/*      ...formData.workIncluded,*/}
                        {/*    ];*/}
                        {/*    newWorkIncluded[index] = {*/}
                        {/*      ...work,*/}
                        {/*      description: e.target.value,*/}
                        {/*    };*/}
                        {/*    handleChange("workIncluded", newWorkIncluded);*/}
                        {/*  }}*/}
                        {/*  className="w-full bg-gray-50 p-2 h-20 text-[10px] focus:outline-none"*/}
                        {/*/>*/}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSubmit}
                disabled={saving || uploading}
                className="flex-1 bg-black text-white py-3 hover:opacity-80 transition-opacity text-[9px] uppercase tracking-wider disabled:opacity-30"
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={onClose}
                disabled={saving || uploading}
                className="flex-1 border border-black py-3 hover:bg-black hover:text-white transition-colors text-[9px] uppercase tracking-wider disabled:opacity-30"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FormModal;
