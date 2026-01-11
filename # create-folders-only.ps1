# create-folders.ps1 - Script sederhana untuk membuat struktur folder

Write-Host "MEMBUAT STRUKTUR FOLDER SISTEM KOPERASI" -ForegroundColor Cyan
Write-Host ""

# Cek apakah di folder proyek React
if (!(Test-Path "package.json")) {
    Write-Host "ERROR: Script harus dijalankan di folder root proyek React!" -ForegroundColor Red
    Write-Host "Pastikan ada file package.json di folder ini" -ForegroundColor Yellow
    exit 1
}

# Buat folder utama src jika belum ada
if (!(Test-Path "src")) {
    New-Item -ItemType Directory -Path "src" -Force | Out-Null
    Write-Host "Folder src/ dibuat" -ForegroundColor Green
}

# Daftar semua folder yang akan dibuat
$folders = @(
    # UI Components
    "src/components/ui/buttons",
    "src/components/ui/forms", 
    "src/components/ui/cards",
    "src/components/ui/modals",
    "src/components/ui/misc",
    
    # Layout Components
    "src/components/layout/header",
    "src/components/layout/sidebar",
    "src/components/layout/footer",
    
    # Feature Components
    "src/components/features/auth",
    "src/components/features/anggota/registration/steps",
    "src/components/features/anggota/registration/forms",
    "src/components/features/anggota/profile",
    "src/components/features/simpanan",
    "src/components/features/pinjaman",
    "src/components/features/dashboard",
    "src/components/features/transaksi",
    
    # Public Pages
    "src/pages/public/auth",
    "src/pages/public/error",
    
    # App Pages
    "src/pages/app/anggota",
    "src/pages/app/simpanan",
    "src/pages/app/pinjaman",
    "src/pages/app/transaksi",
    "src/pages/app/laporan",
    
    # Utilities
    "src/hooks",
    "src/contexts",
    "src/services",
    "src/utils/formatters",
    "src/utils/validators",
    "src/utils/constants",
    "src/utils/helpers",
    "src/routes",
    "src/config"
)

Write-Host "Membuat folder struktur..." -ForegroundColor Yellow

$createdCount = 0
$skippedCount = 0

# Buat semua folder
foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "  [OK] $folder" -ForegroundColor Green
        $createdCount++
    } else {
        Write-Host "  [SKIP] $folder" -ForegroundColor Gray
        $skippedCount++
    }
}

Write-Host ""
Write-Host "HASIL PEMBUATAN" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host "Folder dibuat: $createdCount" -ForegroundColor Green
Write-Host "Folder sudah ada: $skippedCount" -ForegroundColor Yellow
Write-Host "Total folder: $($folders.Count)" -ForegroundColor White
Write-Host ""
Write-Host "Struktur folder berhasil dibuat!" -ForegroundColor Green