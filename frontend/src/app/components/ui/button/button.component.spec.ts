import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonComponent } from './button.component';

async function setup(text: string = 'Button') {
  const clickOutput = jest.fn();
  const { fixture } = await render(`<app-button (click)='click()'>${text}</app-button>`, {
    imports: [ButtonComponent],
    componentProperties: {
      click: clickOutput,
    },
  });

  return {
    fixture: fixture,
    component: fixture.componentInstance,
    properties: {
      click: clickOutput,
    },
  };
}

describe('ButtonComponent', () => {
  it('should emit the click event when clicked', async () => {
    const text = 'Button';
    const { component, properties } = await setup(text);
    expect(component).toBeTruthy();

    fireEvent.click(screen.getByText(text));
    expect(screen.getByRole('button').textContent).toEqual(text);
    expect(properties.click).toHaveBeenCalled();
  });
});
