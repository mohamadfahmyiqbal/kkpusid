import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Swal from "sweetalert2";
import ApprovalPlaceholder from "./ApprovalPlaceholder";

vi.mock("sweetalert2", () => ({ default: { fire: vi.fn() } }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ApprovalPlaceholder", () => {
  it.each([
    [{}, "Menunggu"],
    [{ isApproved: true }, "Selesai"],
    [{ isReadyToPay: true, isApproved: true }, "Siap bayar"],
    [{ isRejected: true, isReadyToPay: true }, "Ditolak"],
  ])("exposes the role and status in its accessible name", (props, status) => {
    render(<ApprovalPlaceholder role="Pengawas" {...props} />);
    expect(screen.getByRole("button", {
      name: `Detail persetujuan Pengawas, ${status}`,
    })).toBeTruthy();
  });

  it("keeps all dynamic dialog content as text and restores focus", () => {
    const value = '<img src=x onerror="alert(1)">';
    render(
      <ApprovalPlaceholder role={value} approverName={value} note={value} />
    );
    fireEvent.click(screen.getByRole("button"));
    const options = Swal.fire.mock.calls[0][0];
    expect(options.titleText).toContain(value);
    expect(options.html.textContent).toContain(value);
    expect(options.html.querySelector("img")).toBeNull();
    expect(options.returnFocus).toBe(true);
  });

  it("shows an empty note message when there is no note", () => {
    render(<ApprovalPlaceholder role="Ketua" />);
    fireEvent.click(screen.getByRole("button"));
    expect(Swal.fire.mock.calls[0][0].html.textContent).toContain("Tidak ada catatan.");
  });
});
