import { useCallback, useState, useEffect, useRef } from "react";
import UAnggota from "../../../../utils/api/UAnggota";

export default function useRegistrationStatus() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const fetchRegistrationStatus = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      const response = await UAnggota.getRegistrationStatus();
      const result = response.data;
      console.log(result);

      // Validasi berdasarkan flag pendaftaran selesai dari API
      if (
        result?.status === true &&
        result.is_registration_done === true &&
        result.data
      ) {
        setIsRegistered(true);
        setRegistrationData(result.data);

        // Hentikan polling jika sudah disetujui sepenuhnya
        if (result.data.final_status === "APPROVED" && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        setIsRegistered(false);
        setRegistrationData(null);
      }
    } catch (err) {
      console.error("--- DEBUG ERROR ---");
      console.error("Error Message:", err.message);
      setIsRegistered(false);
      setRegistrationData(null);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrationStatus();

    // Polling setiap 30 detik
    intervalRef.current = setInterval(() => {
      fetchRegistrationStatus(false);
    }, 30000);

    const handleRefresh = () => {
      fetchRegistrationStatus(false);
    };
    window.addEventListener("REFRESH_REGISTRATION_STATUS", handleRefresh);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("REFRESH_REGISTRATION_STATUS", handleRefresh);
    };
  }, [fetchRegistrationStatus]);

  return { isRegistered, registrationData, loading };
}
