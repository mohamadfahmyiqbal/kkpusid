# create-empty-files.ps1
# Script untuk membuat file-file kosong

Write-Host "MEMBUAT FILE-FILE KOSONG UNTUK SISTEM KOPERASI" -ForegroundColor Cyan
Write-Host ""

# Pastikan folder src sudah ada
if (!(Test-Path "src")) {
    Write-Host "ERROR: Folder src/ belum ada!" -ForegroundColor Red
    Write-Host "Jalankan create-folders.ps1 terlebih dahulu" -ForegroundColor Yellow
    exit 1
}

# Daftar semua file yang akan dibuat
$files = @(
    # File utama
    "src/App.jsx",
    "src/main.jsx",
    "src/index.css",
    
    # UI Components
    "src/components/ui/buttons/PrimaryButton.jsx",
    "src/components/ui/buttons/SecondaryButton.jsx",
    "src/components/ui/buttons/IconButton.jsx",
    
    "src/components/ui/forms/FormInput.jsx",
    "src/components/ui/forms/FormSelect.jsx",
    "src/components/ui/forms/FormCheckbox.jsx",
    
    "src/components/ui/cards/InfoCard.jsx",
    "src/components/ui/cards/StatCard.jsx",
    "src/components/ui/cards/DashboardCard.jsx",
    
    "src/components/ui/modals/ConfirmationModal.jsx",
    "src/components/ui/modals/InfoModal.jsx",
    
    "src/components/ui/misc/LoadingSpinner.jsx",
    "src/components/ui/misc/EmptyState.jsx",
    "src/components/ui/misc/AlertMessage.jsx",
    
    # Layout Components
    "src/components/layout/MainLayout.jsx",
    "src/components/layout/AuthLayout.jsx",
    "src/components/layout/DashboardLayout.jsx",
    
    "src/components/layout/header/MainHeader.jsx",
    "src/components/layout/header/UserMenu.jsx",
    "src/components/layout/header/NotificationBell.jsx",
    
    "src/components/layout/sidebar/MainSidebar.jsx",
    "src/components/layout/sidebar/SidebarMenu.jsx",
    "src/components/layout/sidebar/SidebarItem.jsx",
    
    "src/components/layout/footer/MainFooter.jsx",
    
    # Feature Components - Auth
    "src/components/features/auth/LoginForm.jsx",
    "src/components/features/auth/RegisterForm.jsx",
    "src/components/features/auth/ForgotPasswordForm.jsx",
    
    # Feature Components - Anggota
    "src/components/features/anggota/registration/RegistrationWizard.jsx",
    
    "src/components/features/anggota/registration/steps/PersonalDataStep.jsx",
    "src/components/features/anggota/registration/steps/EmploymentStep.jsx",
    "src/components/features/anggota/registration/steps/BankDataStep.jsx",
    "src/components/features/anggota/registration/steps/DocumentStep.jsx",
    "src/components/features/anggota/registration/steps/SummaryStep.jsx",
    
    "src/components/features/anggota/registration/forms/PersonalDataForm.jsx",
    "src/components/features/anggota/registration/forms/BankDataForm.jsx",
    "src/components/features/anggota/registration/forms/EmploymentForm.jsx",
    
    "src/components/features/anggota/profile/ProfileHeader.jsx",
    "src/components/features/anggota/profile/ProfileInfo.jsx",
    
    # Feature Components - Simpanan
    "src/components/features/simpanan/SimpananCard.jsx",
    "src/components/features/simpanan/DepositForm.jsx",
    "src/components/features/simpanan/WithdrawalForm.jsx",
    
    # Feature Components - Pinjaman
    "src/components/features/pinjaman/LoanCard.jsx",
    "src/components/features/pinjaman/LoanApplicationForm.jsx",
    
    # Feature Components - Dashboard
    "src/components/features/dashboard/WelcomeBanner.jsx",
    "src/components/features/dashboard/QuickActions.jsx",
    "src/components/features/dashboard/StatsOverview.jsx",
    
    # Feature Components - Transaksi
    "src/components/features/transaksi/TransactionList.jsx",
    "src/components/features/transaksi/TransactionFilter.jsx",
    
    # Pages - Public
    "src/pages/public/LandingPage.jsx",
    
    "src/pages/public/auth/LoginPage.jsx",
    "src/pages/public/auth/RegisterPage.jsx",
    "src/pages/public/auth/ForgotPasswordPage.jsx",
    "src/pages/public/auth/ResetPasswordPage.jsx",
    
    "src/pages/public/error/NotFoundPage.jsx",
    "src/pages/public/error/MaintenancePage.jsx",
    
    # Pages - App
    "src/pages/app/DashboardPage.jsx",
    
    "src/pages/app/anggota/RegistrationPage.jsx",
    "src/pages/app/anggota/ProfilePage.jsx",
    "src/pages/app/anggota/MembersPage.jsx",
    
    "src/pages/app/simpanan/SimpananPage.jsx",
    "src/pages/app/simpanan/DepositPage.jsx",
    "src/pages/app/simpanan/WithdrawalPage.jsx",
    
    "src/pages/app/pinjaman/PinjamanPage.jsx",
    "src/pages/app/pinjaman/ApplyLoanPage.jsx",
    "src/pages/app/pinjaman/LoanDetailPage.jsx",
    
    "src/pages/app/transaksi/TransactionPage.jsx",
    "src/pages/app/transaksi/TransactionDetailPage.jsx",
    
    "src/pages/app/laporan/ReportsPage.jsx",
    "src/pages/app/laporan/StatementPage.jsx",
    
    # Hooks
    "src/hooks/useAuth.js",
    "src/hooks/useLocalStorage.js",
    "src/hooks/useApi.js",
    "src/hooks/useForm.js",
    
    # Contexts
    "src/contexts/AuthContext.jsx",
    "src/contexts/UserContext.jsx",
    "src/contexts/NotificationContext.jsx",
    
    # Services
    "src/services/apiClient.js",
    "src/services/authService.js",
    "src/services/anggotaService.js",
    "src/services/simpananService.js",
    "src/services/pinjamanService.js",
    "src/services/transaksiService.js",
    
    # Utils - Formatters
    "src/utils/formatters/currency.js",
    "src/utils/formatters/date.js",
    "src/utils/formatters/number.js",
    
    # Utils - Validators
    "src/utils/validators/authValidator.js",
    "src/utils/validators/anggotaValidator.js",
    
    # Utils - Constants
    "src/utils/constants/routes.js",
    "src/utils/constants/apiEndpoints.js",
    "src/utils/constants/appConstants.js",
    
    # Utils - Helpers
    "src/utils/helpers/storage.js",
    "src/utils/helpers/authHelper.js",
    
    # Routes
    "src/routes/PublicRoute.jsx",
    "src/routes/PrivateRoute.jsx",
    "src/routes/AppRoutes.jsx",
    "src/routes/index.js",
    
    # Config
    "src/config/bootstrap.config.js",
    "src/config/app.config.js"
)

Write-Host "Membuat file-file kosong..." -ForegroundColor Yellow

$createdCount = 0
$skippedCount = 0

# Buat semua file
foreach ($file in $files) {
    if (!(Test-Path $file)) {
        # Buat file kosong
        New-Item -ItemType File -Path $file -Force | Out-Null
        Write-Host "  [OK] $file" -ForegroundColor Green
        $createdCount++
    } else {
        Write-Host "  [SKIP] $file" -ForegroundColor Gray
        $skippedCount++
    }
}

Write-Host ""
Write-Host "HASIL PEMBUATAN" -ForegroundColor Cyan
Write-Host "===============" -ForegroundColor Cyan
Write-Host "File dibuat: $createdCount" -ForegroundColor Green
Write-Host "File sudah ada: $skippedCount" -ForegroundColor Yellow
Write-Host "Total file: $($files.Count)" -ForegroundColor White
Write-Host ""
Write-Host "File-file kosong berhasil dibuat!" -ForegroundColor Green