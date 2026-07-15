import { useMemo } from "react";
import { isCandidate, isFullMember, isALB, isPengawas, isKetua, isBendahara } from "../constants/roles";

// Cache untuk role configurations dengan limit size
const MAX_CACHE_SIZE = 50;
const roleCache = new Map();

// Utility function untuk cache management
const manageCacheSize = () => {
  if (roleCache.size > MAX_CACHE_SIZE) {
    // Hapus entry pertama (FIFO)
    const firstKey = roleCache.keys().next().value;
    roleCache.delete(firstKey);
  }
};

const getRoleConfig = (statusId) => {
  const roleId = String(statusId);

  return {
    roleId,
    isCandidate: isCandidate(roleId),
    isFullMember: isFullMember(roleId),
    isALB: isALB(roleId),
    isPengawas: isPengawas(roleId),
    isKetua: isKetua(roleId),
    isBendahara: isBendahara(roleId),
  };
};

export const useDashboardRole = (userData) => {
  return useMemo(() => {
    if (!userData) return null;

    const cacheKey = userData.status_id;

    // Check cache first
    if (roleCache.has(cacheKey)) {
      return roleCache.get(cacheKey);
    }

    const roleConfig = getRoleConfig(userData.status_id);

    // Manage cache size sebelum menambah entry baru
    manageCacheSize();
    
    // Cache the result
    roleCache.set(cacheKey, roleConfig);

    return roleConfig;
  }, [userData]);
};

// Utility function to clear cache (useful for testing or when user data changes significantly)
export const clearRoleCache = () => {
  roleCache.clear();
};
