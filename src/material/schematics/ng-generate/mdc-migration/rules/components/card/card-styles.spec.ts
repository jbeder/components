import {createTestApp, patchDevkitTreeToExposeTypeScript} from '@angular/cdk/schematics/testing';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import {createNewTestRunner, migrateComponents, THEME_FILE} from '../test-setup-helper';

describe('card styles', () => {
  let runner: SchematicTestRunner;
  let cliAppTree: UnitTestTree;

  async function runMigrationTest(oldFileContent: string, newFileContent: string) {
    cliAppTree.create(THEME_FILE, oldFileContent);
    const tree = await migrateComponents(['card'], runner, cliAppTree);
    expect(tree.readContent(THEME_FILE)).toBe(newFileContent);
  }

  beforeEach(async () => {
    runner = createNewTestRunner();
    cliAppTree = patchDevkitTreeToExposeTypeScript(await createTestApp(runner));
  });

  describe('mixin migrations', () => {
    it('should replace the old theme with the new ones', async () => {
      await runMigrationTest(
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.card-theme($theme);
      `,
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.mdc-card-theme($theme);
        @include mat.mdc-card-typography($theme);
      `,
      );
    });

    it('should use the correct namespace', async () => {
      await runMigrationTest(
        `
        @use '@angular/material' as arbitrary;
        $theme: ();
        @include arbitrary.card-theme($theme);
      `,
        `
        @use '@angular/material' as arbitrary;
        $theme: ();
        @include arbitrary.mdc-card-theme($theme);
        @include arbitrary.mdc-card-typography($theme);
      `,
      );
    });

    it('should handle updating multiple themes', async () => {
      await runMigrationTest(
        `
        @use '@angular/material' as mat;
        $light-theme: ();
        $dark-theme: ();
        @include mat.card-theme($light-theme);
        @include mat.card-theme($dark-theme);
      `,
        `
        @use '@angular/material' as mat;
        $light-theme: ();
        $dark-theme: ();
        @include mat.mdc-card-theme($light-theme);
        @include mat.mdc-card-typography($light-theme);
        @include mat.mdc-card-theme($dark-theme);
        @include mat.mdc-card-typography($dark-theme);
      `,
      );
    });

    it('should add correct theme if all-component-themes mixin included', async () => {
      await runMigrationTest(
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.all-component-themes($theme);
      `,
        `
        @use '@angular/material' as mat;
        $theme: ();
        @include mat.all-component-themes($theme);
        @include mat.mdc-card-theme($theme);
        @include mat.mdc-card-typography($theme);
      `,
      );
    });

    it('should add multiple themes for multiple all-component-themes mixins', async () => {
      await runMigrationTest(
        `
        @use '@angular/material' as mat;
        $light-theme: ();
        $dark-theme: ();
        @include mat.all-component-themes($light-theme);
        @include mat.all-component-themes($dark-theme);
      `,
        `
        @use '@angular/material' as mat;
        $light-theme: ();
        $dark-theme: ();
        @include mat.all-component-themes($light-theme);
        @include mat.mdc-card-theme($light-theme);
        @include mat.mdc-card-typography($light-theme);
        @include mat.all-component-themes($dark-theme);
        @include mat.mdc-card-theme($dark-theme);
        @include mat.mdc-card-typography($dark-theme);
      `,
      );
    });

    it('should preserve whitespace', async () => {
      await runMigrationTest(
        `
        @use '@angular/material' as mat;
        $theme: ();


        @include mat.card-theme($theme);


      `,
        `
        @use '@angular/material' as mat;
        $theme: ();


        @include mat.mdc-card-theme($theme);
        @include mat.mdc-card-typography($theme);


      `,
      );
    });
  });

  describe('selector migrations', () => {
    it('should update the legacy mat-card classname', async () => {
      await runMigrationTest(
        `
        .mat-card {
          padding-right: 4px;
        }
      `,
        `
        .mat-mdc-card {
          padding-right: 4px;
        }
      `,
      );
    });

    it('should update multiple legacy classnames', async () => {
      await runMigrationTest(
        `
        .mat-card {
          padding-right: 4px;
        }
        .mat-card-footer {
          padding-left: 4px;
        }
      `,
        `
        .mat-mdc-card {
          padding-right: 4px;
        }
        .mat-mdc-card-footer {
          padding-left: 4px;
        }
      `,
      );
    });

    it('should update a legacy classname w/ multiple selectors', async () => {
      await runMigrationTest(
        `
        .some-class.mat-card-title, .another-class {
          font-size: 16px;
        }
      `,
        `
        .some-class.mat-mdc-card-title, .another-class {
          font-size: 16px;
        }
      `,
      );
    });

    it('should preserve the whitespace of multiple selectors', async () => {
      await runMigrationTest(
        `
        .some-class,
        .mat-card-subtitle,
        .another-class { padding: 4px; }
      `,
        `
        .some-class,
        .mat-mdc-card-subtitle,
        .another-class { padding: 4px; }
      `,
      );
    });

    it('should add comment for potentially deprecated selector', async () => {
      await runMigrationTest(
        `
        .mat-card-flat {
          margin: 4px;
        }
      `,
        `
        /* TODO: The following rule targets internal classes of card that may no longer apply for the MDC version. */

        .mat-card-flat {
          margin: 4px;
        }
      `,
      );
    });

    it('should add comment for potentially deprecated multi-line selector', async () => {
      await runMigrationTest(
        `
        .some-class
        .mat-card-flat {
          margin: 4px;
        }
      `,
        `
        /* TODO: The following rule targets internal classes of card that may no longer apply for the MDC version. */

        .some-class
        .mat-card-flat {
          margin: 4px;
        }
      `,
      );
    });

    it('should update the legacy mat-card class and add comment for potentially deprecated selector', async () => {
      await runMigrationTest(
        `
        .mat-card.some-class, .mat-card-flat {
          margin: 4px;
        }
      `,
        `
        /* TODO: The following rule targets internal classes of card that may no longer apply for the MDC version. */

        .mat-mdc-card.some-class, .mat-card-flat {
          margin: 4px;
        }
      `,
      );
    });
  });
});
