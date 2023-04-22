import { render, screen } from '@testing-library/react';
import Calculator from "../../components/Calculator";
import Keypad from "../../components/Keypad";

describe('Keypad renders child components', () => {
  beforeEach(() => {
    render(<Keypad />);
  });

  test('renders keypad block ("Del")', () => {
    const linkElement = screen.getByText(/del/i, { selector: 'button' });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("Reset")', () => {
    const linkElement = screen.getByText(/reset/i, { selector: 'button' });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block (".")', () => {
    const linkElement = screen.getByRole('button', {
      name: '.'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("=")', () => {
    const linkElement = screen.getByRole('button', {
      name: '='
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("/")', () => {
    const linkElement = screen.getByRole('button', {
      name: '/'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("+")', () => {
    const linkElement = screen.getByRole('button', {
      name: '+'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("-")', () => {
    const linkElement = screen.getByRole('button', {
      name: '-'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("x")', () => {
    const linkElement = screen.getByText(/x/i, { selector: 'button' });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("1")', () => {
    const linkElement = screen.getByRole('button', {
      name: '1'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("2")', () => {
    const linkElement = screen.getByRole('button', {
     name: '2'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("3")', () => {
    const linkElement = screen.getByRole('button', {
      name: '3'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("4")', () => {
    const linkElement = screen.getByRole('button', {
      name: '4'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("5")', () => {
    const linkElement = screen.getByRole('button', {
      name: '5'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("6")', () => {
    const linkElement = screen.getByRole('button', {
      name: '6'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("7")', () => {
    const linkElement = screen.getByRole('button', {
      name: '7'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("8")', () => {
    const linkElement = screen.getByRole('button', {
      name: '8'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("9")', () => {
    const linkElement = screen.getByRole('button', {
      name: '9'
    });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders keypad block ("0")', () => {
    const linkElement = screen.getByRole('button', {
      name: '0'
    });
    expect(linkElement).toBeInTheDocument();
  });
})
