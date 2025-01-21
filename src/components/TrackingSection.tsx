import { useState, useEffect } from "react";
import { FaTruck } from "react-icons/fa6";
import { client } from "@/sanity/lib/client"; // Import your Sanity client (adjust path if necessary)

const TrackingSection = ({ orderId }: { orderId: string }) => {
  interface TrackingData {
    carrier: string;
    trackingNumber: string;
    status: string;
    estimatedDelivery: string;
  }

  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTrackingData = async () => {
    setLoading(true);
    setErrorMessage(null); // Reset error message before trying to fetch data

    try {
      // Fetch tracking data from Sanity based on the `orderId`
      const query = `*[_type == "tracking" && orderId == $orderId][0]{
        carrier,
        trackingNumber,
        status,
        estimatedDelivery
      }`;
      const data = await client.fetch(query, { orderId });

      if (data) {
        setTrackingData(data);
      } else {
        setErrorMessage("Tracking data is not available at the moment. It will be added shortly by the admin after collaborating with the shipment vendor. Please check back later.");
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error);
      setErrorMessage("There was an error fetching the tracking details.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async () => {
    await fetchTrackingData(); // Fetch tracking data before showing modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleOpenModal}
        className="text-blue-500 font-semibold flex items-center"
      >
        <FaTruck className="mr-2" />
        View Tracking
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-2xl font-bold text-white hover:text-slate-100"
            >
              ✕
            </button>
            {loading ? (
              <p>Loading tracking details...</p>
            ) : errorMessage ? (
              <p className="text-red-500 font-semibold">{errorMessage}</p>
            ) : trackingData ? (
              <>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  Tracking Details
                </h3>
                <p>
                  <span className="font-semibold text-gray-700">Carrier:</span>{" "}
                  {trackingData.carrier}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Tracking Number:
                  </span>{" "}
                  {trackingData.trackingNumber}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Status:</span>{" "}
                  {trackingData.status}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">
                    Estimated Delivery:
                  </span>{" "}
                  {new Date(trackingData.estimatedDelivery).toLocaleDateString()}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No tracking data found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingSection;
