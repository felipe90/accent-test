import { DateValidatorDirective } from './date-validator.directive';

describe('DateValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new DateValidatorDirective('dateMock', 'dateMock');
    expect(directive).toBeTruthy();
  });
});