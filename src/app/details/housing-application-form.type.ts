import { FormControl } from '@angular/forms';

export type HousingApplicationForm = {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
};
