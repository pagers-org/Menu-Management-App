export const REGEXP = {
  START_TAG:
    /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
  END_TAG: /^<\/([-A-Za-z0-9_]+)[^>]*>/,
  ATTRIBUTE:
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
  ATTRIBUTE_VALID: /(^|[^\\])"/g,
  EMPTY_SPACE: /[\n]*/gi,
};

export const EMPTY = '';

export const ROOT_TYPE = 'Root';
export const ELEMENT_TYPE = 'Element';
export const TEXT_TYPE = 'Text';

export const EMPTY_END_TAG =
  'area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr';

export const FILL_ATTRIBUTE =
  'hidden,checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected';
