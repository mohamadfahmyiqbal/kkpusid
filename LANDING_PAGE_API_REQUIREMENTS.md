# Landing Page API Requirements

Dokumentasi kebutuhan API untuk Landing Page Paguyuban Usaha Sukses.

## Overview

Landing Page membutuhkan beberapa endpoint API untuk menampilkan konten dinamis seperti layanan, statistik, informasi tentang kami, dan kontak.

## API Endpoints

### 1. GET /api/landing/services

**Deskripsi**: Mendapatkan daftar layanan unggulan

**Method**: GET

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Pinjaman Lunak",
      "description": "Pembiayaan sesuai syariah dengan akad yang amanah.",
      "icon": "FaHandHoldingUsd",
      "color": "#2F80ED",
      "order": 1
    },
    {
      "id": 2,
      "title": "Pelatihan Usaha",
      "description": "Tingkatkan kapasitas dan keterampilan bisnis Anda.",
      "icon": "FaChalkboardTeacher",
      "color": "#00B894",
      "order": 2
    },
    {
      "id": 3,
      "title": "Kemitraan Produk",
      "description": "Kerjasama produk berkualitas untuk usaha Anda.",
      "icon": "FaHandshake",
      "color": "#6FCF97",
      "order": 3
    },
    {
      "id": 4,
      "title": "Pendampingan Bisnis",
      "description": "Kami dampingi hingga usaha Anda berkembang.",
      "icon": "FaUsers",
      "color": "#BB6BD9",
      "order": 4
    }
  ]
}
```

---

### 2. GET /api/landing/stats

**Deskripsi**: Mendapatkan statistik koperasi

**Method**: GET

**Response**:
```json
{
  "success": true,
  "data": {
    "active_members": 1250,
    "financed_businesses": 850,
    "satisfaction_rate": 98,
    "cities": 25
  }
}
```

---

### 3. GET /api/landing/about

**Deskripsi**: Mendapatkan informasi tentang kami (visi, misi, deskripsi)

**Method**: GET

**Response**:
```json
{
  "success": true,
  "data": {
    "title": "Membangun Ekonomi Umat dengan Prinsip Syariah",
    "description": "Paguyuban Usaha Sukses hadir sebagai wadah koperasi modern yang membantu anggota berkembang melalui pembiayaan halal, pelatihan usaha, dan kemitraan berkelanjutan.",
    "vision": "Menjadi koperasi syariah terpercaya di Indonesia.",
    "mission": "Memberdayakan usaha anggota dengan sistem amanah, transparan, dan berkelanjutan."
  }
}
```

---

### 4. GET /api/landing/contact

**Deskripsi**: Mendapatkan informasi kontak

**Method**: GET

**Response**:
```json
{
  "success": true,
  "data": {
    "phone": "0812-3456-7890",
    "email": "info@pbs.co.id",
    "address": "Jakarta, Indonesia",
    "social_media": {
      "facebook": "https://facebook.com/pbs",
      "instagram": "https://instagram.com/pbs",
      "linkedin": "https://linkedin.com/company/pbs"
    }
  }
}
```

---

### 5. POST /api/landing/contact-form (Opsional)

**Deskripsi**: Mengirim form kontak dari landing page

**Method**: POST

**Request Body**:
```json
{
  "name": "Nama Lengkap",
  "email": "email@example.com",
  "phone": "081234567890",
  "message": "Pesan dari user"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Pesan berhasil dikirim"
}
```

---

### 6. GET /api/landing/content (Opsional - Single Endpoint)

**Deskripsi**: Mendapatkan semua content landing page dalam satu request

**Method**: GET

**Response**:
```json
{
  "success": true,
  "data": {
    "services": [
      {
        "id": 1,
        "title": "Pinjaman Lunak",
        "description": "Pembiayaan sesuai syariah dengan akad yang amanah.",
        "icon": "FaHandHoldingUsd",
        "color": "#2F80ED",
        "order": 1
      }
    ],
    "stats": {
      "active_members": 1250,
      "financed_businesses": 850,
      "satisfaction_rate": 98,
      "cities": 25
    },
    "about": {
      "title": "Membangun Ekonomi Umat dengan Prinsip Syariah",
      "description": "Paguyuban Usaha Sukses hadir sebagai wadah koperasi modern yang membantu anggota berkembang melalui pembiayaan halal, pelatihan usaha, dan kemitraan berkelanjutan.",
      "vision": "Menjadi koperasi syariah terpercaya di Indonesia.",
      "mission": "Memberdayakan usaha anggota dengan sistem amanah, transparan, dan berkelanjutan."
    },
    "contact": {
      "phone": "0812-3456-7890",
      "email": "info@pbs.co.id",
      "address": "Jakarta, Indonesia",
      "social_media": {
        "facebook": "https://facebook.com/pbs",
        "instagram": "https://instagram.com/pbs",
        "linkedin": "https://linkedin.com/company/pbs"
      }
    }
  }
}
```

---

## Prioritas Implementasi

### High Priority
- ✅ GET /api/landing/services
- ✅ GET /api/landing/stats
- ✅ GET /api/landing/about
- ✅ GET /api/landing/contact

### Medium Priority
- ⚠️ POST /api/landing/contact-form

### Low Priority
- ⏳ GET /api/landing/content (optimasi, bisa digabung dengan API lain)

---

## Notes

1. **Icon Mapping**: Icon name menggunakan format react-icons (FaHandHoldingUsd, FaChalkboardTeacher, dll)
2. **Color Format**: Menggunakan hex color code (#2F80ED, #00B894, dll)
3. **Caching**: Data services, about, dan contact dapat di-cache karena jarang berubah
4. **Stats**: Data stats sebaiknya di-refresh secara berkala (misal: setiap jam)
5. **Error Handling**: Semua endpoint harus mengembalikan format response yang konsisten dengan field `success` dan `data`

---

## Component Mapping

| Component | API Endpoint |
|-----------|--------------|
| ServicesSection | GET /api/landing/services |
| StatsSection | GET /api/landing/stats |
| AboutUsSection | GET /api/landing/about |
| LandingFooter | GET /api/landing/contact |
| CallToActionSection | POST /api/landing/contact-form (opsional) |

---

## Implementation Example (Frontend)

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

const useLandingData = () => {
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [about, setAbout] = useState(null);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const [servicesRes, statsRes, aboutRes, contactRes] = await Promise.all([
          axios.get('/api/landing/services'),
          axios.get('/api/landing/stats'),
          axios.get('/api/landing/about'),
          axios.get('/api/landing/contact')
        ]);

        setServices(servicesRes.data.data);
        setStats(statsRes.data.data);
        setAbout(aboutRes.data.data);
        setContact(contactRes.data.data);
      } catch (error) {
        console.error('Error fetching landing data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
  }, []);

  return { services, stats, about, contact, loading };
};
```
