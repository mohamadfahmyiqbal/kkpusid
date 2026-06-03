// Test format rupiah functionality
const formatRupiah = (value) => {
  const numericValue = parseInt(value) || 0;
  return new Intl.NumberFormat('id-ID').format(numericValue);
};

// Test cases
console.log('Testing format rupiah:');
console.log('3000000 ->', formatRupiah('3000000'));
console.log('10000000 ->', formatRupiah('10000000'));
console.log('500000 ->', formatRupiah('500000'));
console.log('0 ->', formatRupiah('0'));
console.log('1234567890 ->', formatRupiah('1234567890'));

// Test input handling
const handleInputChange = (name, value) => {
  if (name === "nominalPinjaman") {
    // Format untuk input nominal: hapus semua karakter non-digit
    const cleanValue = value.replace(/\D/g, '');
    const numericValue = parseInt(cleanValue) || 0;
    return numericValue.toString();
  }
  return value;
};

console.log('\nTesting input handling:');
console.log('Input "3,000,000" ->', handleInputChange('nominalPinjaman', '3,000,000'));
console.log('Input "Rp 3.000.000" ->', handleInputChange('nominalPinjaman', 'Rp 3.000.000'));
console.log('Input "abc123def" ->', handleInputChange('nominalPinjaman', 'abc123def'));
console.log('Input "" ->', handleInputChange('nominalPinjaman', ''));
