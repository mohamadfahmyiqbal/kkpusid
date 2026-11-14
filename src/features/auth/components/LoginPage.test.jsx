import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../login/page/LoginPage';
import { AUTH_CONSTANTS } from '../constants/authConstants';

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

describe('LoginPage', () => {
  it('renders login form with email and password inputs', () => {
    render(<LoginPage />);

    expect(screen.getByPlaceholderText(AUTH_CONSTANTS.PLACEHOLDERS.EMAIL_OR_PHONE)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(AUTH_CONSTANTS.PLACEHOLDERS.LOGIN_PASSWORD)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /masuk sekarang/i })).toBeInTheDocument();
  });

  it('shows error message when form is submitted with empty fields', async () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole('button', { name: /masuk sekarang/i }));

    await waitFor(() => {
      expect(screen.getByText(AUTH_CONSTANTS.ERROR_MESSAGES.EMAIL_OR_PHONE_REQUIRED)).toBeInTheDocument();
    });
  });
});
