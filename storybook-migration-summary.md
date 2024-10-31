# Storybook 8 Migration Summary

## Upgrade Storybook packages

The following command was ran to upgrade the Storybook packages:

```bash
npx storybook@latest upgrade
```

## The Storybook automigration scripts were ran

The following commands ran successfully and your Storybook configuration was successfully migrated to the latest version 7:

- `npx storybook@latest automigrate --config-dir .storybook`

Please make sure to check the results yourself and make sure that everything is working as expected.

Also, we may have missed something. Please make sure to check the logs of the Storybook CLI commands that were run, and look for
the `❌ Failed trying to evaluate` message or `❌ The migration failed to update` message. This will indicate if a command was
unsuccessful, and will help you run the migration again, manually.

## Next steps

You can make sure everything is working as expected by trying
to build or serve your Storybook as you normally would.

```bash
npx nx build-storybook project-name
```

```bash
npx nx storybook project-name
```

Please read the [Storybook 8.0.0 release article](https://storybook.js.org/blog/storybook-8/) and the
official [Storybook 8.0.0 migration guide](https://storybook.js.org/docs/react/migration-guide)
for more information.
