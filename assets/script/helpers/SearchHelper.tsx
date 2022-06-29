import React from 'react';

import {
  Select, Input,
} from 'antd';

const { Search } = Input;

export const searchField = (name: string, attribute:string | Array<string>) => {
  if (typeof attribute === 'string') {
    return (
      <Select
        key={attribute ?? ''}
        value={attribute ?? ''}
      >
        {name}
      </Select>
    );
  }

  return (
    <Select
      key={attribute.join('-') ?? ''}
      value={attribute ?? ''}
    >
      {name}
    </Select>
  );
};

export const searchSelector = (
  searchConfigAttributes:Array<{ name:string, attribute:string | Array<string> }>,
  searchAttribute:string | Array<string> | null,
  handleSearchAttribute: (attribute:string | Array<string>) => void,
  onSearch: (searchTerm:string) => void,
) => {
  // No searchable fields.
  if (searchConfigAttributes.length === 0) {
    return {};
  }

  if (searchAttribute === null) {
    handleSearchAttribute(searchConfigAttributes[0].attribute);
  }

  // One searchable field.
  if (searchConfigAttributes.length === 1) {
    return (
      <Search placeholder="Zoek" allowClear onSearch={onSearch} style={{ width: 200 }} />
    );
  }

  // Multiple Searchable fields.
  return (
    <>
      <Select
        defaultValue={searchConfigAttributes[0].attribute}
        placeholder="Zoekveld"
        style={{ width: 200 }}
        onChange={handleSearchAttribute}
      >
        { searchConfigAttributes.map((att) => searchField(att.name, att.attribute))}
      </Select>
      <Search placeholder="Zoek" allowClear onSearch={onSearch} style={{ width: 200 }} />
    </>
  );
};

const getNestedValue = (obj:any, keys:Array<string>) : any => {
  type ObjectKey = keyof typeof obj;
  const key = keys[0] as ObjectKey;

  // error if this occurs.
  if (keys === undefined || keys.length === 0) {
    return undefined;
  }

  // If single length array, just give value.
  if (keys.length === 1) {
    return obj[key];
  }

  keys.shift();
  return getNestedValue(obj[key], keys);
};

// Client side filtering.
export const searchFilter = (array:any[], searchAttribute:string | Array<string>
| null, searchTerm:string | null) => array.filter((value:any) => {
  if (searchAttribute !== null && searchTerm !== null) {
    let valueOfKey;
    if (typeof searchAttribute === 'string') {
      valueOfKey = value[searchAttribute] as string;
    } else {
      const clonedSearchAttribute = Object.assign([], searchAttribute);
      valueOfKey = getNestedValue(value, clonedSearchAttribute) as string;
    }
    if (valueOfKey !== undefined) {
      return valueOfKey.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }
  return true;
});
