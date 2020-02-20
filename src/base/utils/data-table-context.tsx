/**
 * This module is exported from base so it doesn't create a dependency on data table to modules that might consume it
 */
import { createContext } from 'react';

/** Are we inside of a data table */
export const DataTableContext = createContext(false);

/**
 * Context to allow us to let our rows in the header know to use the right classes.
 * This method is being used to avoid a breaking change from RMWC to MDC tables and also to inform other components of styles needed.
 */
export const DataTableHeadContext = createContext(false);
