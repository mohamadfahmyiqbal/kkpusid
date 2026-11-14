import { useMemo } from "react";
import {
  isCandidate,
  isCandidateByType,
  isFullMember,
  isALB,
  isPengawas,
  isKetua,
  isBendahara,
} from "../constants/roles";

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

const getRoleConfig = (statusId, memberType) => {
  const roleId = String(statusId);

  // Calon Anggota ditentukan dari status_id == '1' ATAU member_type mengandung "calon".
  // Di DB, status_id untuk "Calon Anggota" bisa berupa numeric string ('1') atau UUID,
  // sedangkan status_id "AKTIF" (UUID) jangan dianggap calon.
  const candidateByStatus = isCandidate(roleId);
  const candidateByType = isCandidateByType(memberType);

  return {
    roleId,
    isCandidate: candidateByStatus || candidateByType,
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

    const cacheKey = `${userData.status_id}::${userData.member_type || ""}`;

    // Check cache first
    if (roleCache.has(cacheKey)) {
      return roleCache.get(cacheKey);
    }

    const roleConfig = getRoleConfig(userData.status_id, userData.member_type);

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