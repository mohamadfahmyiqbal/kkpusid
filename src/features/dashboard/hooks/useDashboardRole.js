import { useMemo } from "react";

export const useDashboardRole = (userData) =>
  useMemo(() => {
    if (!userData) return null;

    const parsedRoleId = Number.parseInt(userData.status_id, 10);
    const roleId = Number.isNaN(parsedRoleId) ? 1 : parsedRoleId;

    return {
      roleId,
      isCandidate: roleId === 1,
      isFullMember: roleId === 5 || roleId === 6,
      isALB: roleId === 6,
      isPengawas: roleId === 2,
      isKetua: roleId === 3,
      isBendahara: roleId === 4,
    };
  }, [userData]);
