/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {StyleMigrator} from './style-migrator';
import {TemplateMigrator} from './template-migrator';

import {AutocompleteStylesMigrator} from './components/autocomplete/autocomplete-styles';
import {ButtonRuntimeMigrator} from './components/button/button-runtime';
import {ButtonStylesMigrator} from './components/button/button-styles';
import {CardStylesMigrator} from './components/card/card-styles';
import {CardTemplateMigrator} from './components/card/card-template';
import {CheckboxStylesMigrator} from './components/checkbox/checkbox-styles';
import {ChipsStylesMigrator} from './components/chips/chips-styles';
import {ChipsTemplateMigrator} from './components/chips/chips-template';
import {DialogStylesMigrator} from './components/dialog/dialog-styles';
import {FormFieldStylesMigrator} from './components/form-field/form-field-styles';
import {InputStylesMigrator} from './components/input/input-styles';
import {ListStylesMigrator} from './components/list/list-styles';
import {MenuStylesMigrator} from './components/menu/menu-styles';
import {PaginatorStylesMigrator} from './components/paginator/paginator-styles';
import {ProgressBarStylesMigrator} from './components/progress-bar/progress-bar-styles';
import {ProgressSpinnerStylesMigrator} from './components/progress-spinner/progress-spinner-styles';
import {RadioStylesMigrator} from './components/radio/radio-styles';
import {RuntimeMigrator} from './runtime-migrator';
import {SelectStylesMigrator} from './components/select/select-styles';
import {SlideToggleStylesMigrator} from './components/slide-toggle/slide-toggle-styles';
import {SliderStylesMigrator} from './components/slider/slider-styles';
import {TableStylesMigrator} from './components/table/table-styles';
import {TabsStylesMigrator} from './components/tabs/tabs-styles';
import {TooltipStylesMigrator} from './components/tooltip/tooltip-styles';

/** Contains the migrators to migrate a single component. */
export interface ComponentMigrator {
  component: string;
  styles: StyleMigrator;
  template?: TemplateMigrator;
  runtime?: RuntimeMigrator;
}

export const MIGRATORS: ComponentMigrator[] = [
  {
    component: 'autocomplete',
    styles: new AutocompleteStylesMigrator(),
  },
  {
    component: 'button',
    styles: new ButtonStylesMigrator(),
    runtime: new ButtonRuntimeMigrator(),
  },
  {
    component: 'card',
    styles: new CardStylesMigrator(),
    template: new CardTemplateMigrator(),
  },
  {
    component: 'checkbox',
    styles: new CheckboxStylesMigrator(),
  },
  {
    component: 'chips',
    styles: new ChipsStylesMigrator(),
    template: new ChipsTemplateMigrator(),
  },
  {
    component: 'dialog',
    styles: new DialogStylesMigrator(),
  },
  {
    component: 'form-field',
    styles: new FormFieldStylesMigrator(),
  },
  {
    component: 'input',
    styles: new InputStylesMigrator(),
  },
  {
    component: 'list',
    styles: new ListStylesMigrator(),
  },
  {
    component: 'menu',
    styles: new MenuStylesMigrator(),
  },
  {
    component: 'paginator',
    styles: new PaginatorStylesMigrator(),
  },
  {
    component: 'progress-bar',
    styles: new ProgressBarStylesMigrator(),
  },
  {
    component: 'progress-spinner',
    styles: new ProgressSpinnerStylesMigrator(),
  },
  {
    component: 'radio',
    styles: new RadioStylesMigrator(),
  },
  {
    component: 'select',
    styles: new SelectStylesMigrator(),
  },
  {
    component: 'slide-toggle',
    styles: new SlideToggleStylesMigrator(),
  },
  {
    component: 'slider',
    styles: new SliderStylesMigrator(),
  },
  {
    component: 'table',
    styles: new TableStylesMigrator(),
  },
  {
    component: 'tabs',
    styles: new TabsStylesMigrator(),
  },
  {
    component: 'tooltip',
    styles: new TooltipStylesMigrator(),
  },
];
