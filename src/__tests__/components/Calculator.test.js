import { render, screen } from '@testing-library/react';
import Calculator from "../../components/Calculator";

describe('Calculator child components', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  test('renders header block (calc)', () => {
    const linkElement = screen.getByText(/calc/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders header block (theme)', () => {
    // screen.debug()
    const linkElement = screen.queryByText(/theme/i);
    expect(linkElement).toBeInTheDocument();
  });

})

it('matches snapshot', () => {
  render(<Calculator />);
})