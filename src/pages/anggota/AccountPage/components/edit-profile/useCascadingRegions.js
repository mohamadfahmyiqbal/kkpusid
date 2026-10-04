import { useState, useEffect } from "react";
import UGlobal from "../../../../utils/api/UGlobal";

export function useCascadingRegions(show, provinceId, cityId, districtId) {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  // Fetch Provinces on open
  useEffect(() => {
    if (show) {
      UGlobal.getProvinces()
        .then((res) => {
          if (res && res.data) {
            setProvinces(res.data.map((p) => ({ value: p.id, label: p.name })));
          }
        })
        .catch((err) => console.error("Error loading provinces:", err));
    }
  }, [show]);

  // Sync regencies when provinceId changes
  useEffect(() => {
    if (provinceId) {
      UGlobal.getRegencies(provinceId)
        .then((res) => {
          if (res && res.data) {
            setRegencies(res.data.map((r) => ({ value: r.id, label: r.name })));
          }
        })
        .catch((err) => console.error("Error loading regencies:", err));
    } else {
      setRegencies([]);
    }
  }, [provinceId]);

  // Sync districts when cityId changes
  useEffect(() => {
    if (cityId) {
      UGlobal.getDistricts(cityId)
        .then((res) => {
          if (res && res.data) {
            setDistricts(res.data.map((d) => ({ value: d.id, label: d.name })));
          }
        })
        .catch((err) => console.error("Error loading districts:", err));
    } else {
      setDistricts([]);
    }
  }, [cityId]);

  // Sync villages when districtId changes
  useEffect(() => {
    if (districtId) {
      UGlobal.getVillages(districtId)
        .then((res) => {
          if (res && res.data) {
            setVillages(res.data.map((v) => ({ value: v.id, label: v.name })));
          }
        })
        .catch((err) => console.error("Error loading villages:", err));
    } else {
      setVillages([]);
    }
  }, [districtId]);

  return {
    provinces,
    regencies,
    districts,
    villages,
  };
}
