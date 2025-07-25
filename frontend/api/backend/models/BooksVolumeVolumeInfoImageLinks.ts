/* tslint:disable */
/* eslint-disable */
/**
 * ssg-example
 * example backend for static site generation
 *
 * The version of the OpenAPI document: 1.0
 * Contact: koeshiro@yandex.ru
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface BooksVolumeVolumeInfoImageLinks
 */
export interface BooksVolumeVolumeInfoImageLinks {
    /**
     * ExtraLarge: Image link for extra large size (width of ~1280 pixels). (In
     * LITE projection)
     * @type {string}
     * @memberof BooksVolumeVolumeInfoImageLinks
     */
    extraLarge?: string;
    /**
     * Large: Image link for large size (width of ~800 pixels). (In LITE
     * projection)
     * @type {string}
     * @memberof BooksVolumeVolumeInfoImageLinks
     */
    large?: string;
    /**
     * Medium: Image link for medium size (width of ~575 pixels). (In LITE
     * projection)
     * @type {string}
     * @memberof BooksVolumeVolumeInfoImageLinks
     */
    medium?: string;
    /**
     * Small: Image link for small size (width of ~300 pixels). (In LITE
     * projection)
     * @type {string}
     * @memberof BooksVolumeVolumeInfoImageLinks
     */
    small?: string;
    /**
     * SmallThumbnail: Image link for small thumbnail size (width of ~80 pixels).
     * (In LITE projection)
     * @type {string}
     * @memberof BooksVolumeVolumeInfoImageLinks
     */
    smallThumbnail?: string;
    /**
     * Thumbnail: Image link for thumbnail size (width of ~128 pixels). (In LITE
     * projection)
     * @type {string}
     * @memberof BooksVolumeVolumeInfoImageLinks
     */
    thumbnail?: string;
}

/**
 * Check if a given object implements the BooksVolumeVolumeInfoImageLinks interface.
 */
export function instanceOfBooksVolumeVolumeInfoImageLinks(value: object): value is BooksVolumeVolumeInfoImageLinks {
    return true;
}

export function BooksVolumeVolumeInfoImageLinksFromJSON(json: any): BooksVolumeVolumeInfoImageLinks {
    return BooksVolumeVolumeInfoImageLinksFromJSONTyped(json, false);
}

export function BooksVolumeVolumeInfoImageLinksFromJSONTyped(json: any, ignoreDiscriminator: boolean): BooksVolumeVolumeInfoImageLinks {
    if (json == null) {
        return json;
    }
    return {
        
        'extraLarge': json['extraLarge'] == null ? undefined : json['extraLarge'],
        'large': json['large'] == null ? undefined : json['large'],
        'medium': json['medium'] == null ? undefined : json['medium'],
        'small': json['small'] == null ? undefined : json['small'],
        'smallThumbnail': json['smallThumbnail'] == null ? undefined : json['smallThumbnail'],
        'thumbnail': json['thumbnail'] == null ? undefined : json['thumbnail'],
    };
}

export function BooksVolumeVolumeInfoImageLinksToJSON(json: any): BooksVolumeVolumeInfoImageLinks {
    return BooksVolumeVolumeInfoImageLinksToJSONTyped(json, false);
}

export function BooksVolumeVolumeInfoImageLinksToJSONTyped(value?: BooksVolumeVolumeInfoImageLinks | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'extraLarge': value['extraLarge'],
        'large': value['large'],
        'medium': value['medium'],
        'small': value['small'],
        'smallThumbnail': value['smallThumbnail'],
        'thumbnail': value['thumbnail'],
    };
}

