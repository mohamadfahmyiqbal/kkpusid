// Role constants untuk koperasi
export const ROLE_IDS = {
  CALON_ANGGOTA: '1',
  PENGAWAS: '2',
  KETUA: '3',
  BENDAHARA: '4',
  ANGGOTA_PENUH: '5',
  ANGGOTA_PENUH_ALB: '6',
};

// Role names untuk display
export const ROLE_NAMES = {
  [ROLE_IDS.CALON_ANGGOTA]: 'Calon Anggota',
  [ROLE_IDS.PENGAWAS]: 'Pengawas',
  [ROLE_IDS.KETUA]: 'Ketua',
  [ROLE_IDS.BENDAHARA]: 'Bendahara',
  [ROLE_IDS.ANGGOTA_PENUH]: 'Anggota Penuh',
  [ROLE_IDS.ANGGOTA_PENUH_ALB]: 'Anggota Penuh ALB',
};

// Helper function untuk cek role
export const isCandidate = (roleId) => roleId === ROLE_IDS.CALON_ANGGOTA;
export const isFullMember = (roleId) => roleId === ROLE_IDS.ANGGOTA_PENUH || roleId === ROLE_IDS.ANGGOTA_PENUH_ALB;
export const isALB = (roleId) => roleId === ROLE_IDS.ANGGOTA_PENUH_ALB;
export const isPengawas = (roleId) => roleId === ROLE_IDS.PENGAWAS;
export const isKetua = (roleId) => roleId === ROLE_IDS.KETUA;
export const isBendahara = (roleId) => roleId === ROLE_IDS.BENDAHARA;
