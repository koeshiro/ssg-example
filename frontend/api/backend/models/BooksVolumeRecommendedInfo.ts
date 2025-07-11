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
 * @interface BooksVolumeRecommendedInfo
 */
export interface BooksVolumeRecommendedInfo {
    /**
     * Explanation: A text explaining why this volume is recommended.
     * @type {string}
     * @memberof BooksVolumeRecommendedInfo
     */
    explanation?: string;
}

/**
 * Check if a given object implements the BooksVolumeRecommendedInfo interface.
 */
export function instanceOfBooksVolumeRecommendedInfo(value: object): value is BooksVolumeRecommendedInfo {
    return true;
}

export function BooksVolumeRecommendedInfoFromJSON(json: any): BooksVolumeRecommendedInfo {
    return BooksVolumeRecommendedInfoFromJSONTyped(json, false);
}

export function BooksVolumeRecommendedInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BooksVolumeRecommendedInfo {
    if (json == null) {
        return json;
    }
    return {
        
        'explanation': json['explanation'] == null ? undefined : json['explanation'],
    };
}

export function BooksVolumeRecommendedInfoToJSON(json: any): BooksVolumeRecommendedInfo {
    return BooksVolumeRecommendedInfoToJSONTyped(json, false);
}

export function BooksVolumeRecommendedInfoToJSONTyped(value?: BooksVolumeRecommendedInfo | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'explanation': value['explanation'],
    };
}

