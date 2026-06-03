# Implementasi Socket Real-time untuk Payment Success

## Overview
Implementasi socket real-time untuk menangani notifikasi pembayaran berhasil dari Midtrans dan update UI secara otomatis.

## Flow Implementation

### 1. Backend (Midtrans Notification)
- **File**: `be/controllers/webhooks/midtransNotification.js`
- **Event**: `new_notification`
- **Data Structure**:
```javascript
{
  notification_id: string,
  title: "Pembayaran Berhasil!",
  content: "Setoran sebesar Rp X telah diterima...",
  type: "PAYMENT_SUCCESS",
  sent_datetime: string,
  url: "/"
}
```

### 2. Frontend Socket Listeners

#### A. Global Socket Listener (App.js)
- **File**: `fe/src/App.js`
- **Event**: `new_notification`
- **Actions**:
  - Tampilkan toast notification
  - Trigger `CLOSE_SNAP_POPUP` event
  - Trigger `REFRESH_REGISTRATION_STATUS` event

#### B. Socket Listener Helper
- **File**: `fe/src/utils/helper/SocketListener.js`
- **Event**: `new_notification`
- **Actions**:
  - Handle `PAYMENT_SUCCESS` type
  - Dispatch custom events untuk UI update
  - Callback untuk component-specific updates

#### C. Payment Handler Hook
- **File**: `fe/src/hooks/usePaymentHandler.js`
- **Events**: `CLOSE_SNAP_POPUP`, `PAYMENT_SUCCESSFUL`
- **Actions**:
  - Tutup Snap popup
  - Reset payment state
  - Display confirmation toast

### 3. Component Integration

#### A. RegistrationPage
- **File**: `fe/src/pages/anggota/RegistrationPage/pages/RegistrationPage.jsx`
- **Hook**: `usePaymentHandler`
- **Action**: Refresh registration status saat payment success

#### B. RegistrationSummary
- **File**: `fe/src/pages/anggota/RegistrationSummary/pages/RegistrationSummary.jsx`
- **Hook**: `usePaymentHandler`
- **Action**: Update UI real-time

#### C. ProfileContext
- **File**: `fe/src/components/layout/contexts/ProfileContext.jsx`
- **Event**: `new_notification`
- **Actions**:
  - Refresh profile data via `profile:request`
  - Refresh bills data
  - Update notifications list

#### D. InvoicePage
- **File**: `fe/src/pages/global/InvoicePage/pages/InvoicePage.jsx`
- **Listener**: `CLOSE_SNAP_POPUP`
- **Action**: Tutup Snap popup saat menerima notifikasi

## Event Flow

```
Midtrans Payment Success
    ↓
Backend Webhook Process
    ↓
Emit Socket Event: new_notification
    ↓
Frontend Receives Event
    ↓
1. Show Toast Notification (App.js)
2. Trigger CLOSE_SNAP_POPUP (InvoicePage)
3. Trigger REFRESH_REGISTRATION_STATUS (RegistrationPage)
4. Refresh Profile Data (ProfileContext)
5. Refresh Bills Data (ProfileContext)
6. Update Component States
    ↓
UI Updates:
- Snap popup closes
- Registration status refreshes
- Profile data updates
- Bills data updates
- Component state updates
```

## Custom Events

### 1. CLOSE_SNAP_POPUP
- **Purpose**: Menutup Snap popup Midtrans
- **Trigger**: Socket notification dengan type="PAYMENT_SUCCESS"
- **Handler**: InvoicePage dan usePaymentHandler

### 2. REFRESH_REGISTRATION_STATUS
- **Purpose**: Refresh status registrasi member
- **Trigger**: Socket notification dengan type="PAYMENT_SUCCESS"
- **Handler**: useRegistrationStatus hook

### 3. PAYMENT_SUCCESSFUL
- **Purpose**: Update UI global setelah pembayaran berhasil
- **Trigger**: Socket notification dengan type="PAYMENT_SUCCESS"
- **Handler**: usePaymentHandler hook

## Benefits

1. **Real-time Updates**: Status pembayaran langsung terupdate tanpa refresh
2. **Better UX**: Snap popup otomatis tertutup setelah pembayaran berhasil
3. **Reliable**: Menggunakan socket connection untuk komunikasi real-time
4. **Decoupled**: Backend dan frontend bekerja terpisah namun terintegrasi
5. **Scalable**: Mudah ditambahkan event type lainnya

## Usage Example

```javascript
// Di component yang perlu listen payment success
import { usePaymentHandler } from '../hooks/usePaymentHandler';

function MyComponent() {
  const { paymentSuccess, paymentData } = usePaymentHandler();
  
  useEffect(() => {
    if (paymentSuccess) {
      // Handle payment success
      console.log('Payment successful:', paymentData);
    }
  }, [paymentSuccess, paymentData]);
  
  return <div>...</div>;
}
```

## Testing

1. Lakukan pembayaran via Midtrans
2. Backend akan mengirim notifikasi via socket
3. Frontend akan menerima event dan update UI
4. Snap popup akan otomatis tertutup
5. Status registrasi akan terupdate

## Troubleshooting

### Socket Not Connected
- Pastikan token JWT valid
- Cek koneksi socket server
- Verify CORS configuration

### Events Not Triggered
- Cek event name di backend dan frontend
- Verify socket event emission
- Check browser console untuk errors

### Snap Popup Not Closing
- Pastikan `window.snap` tersedia
- Cek event listener registration
- Verify custom event dispatching
