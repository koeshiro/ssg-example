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
import type { BooksVolumeUserInfoRentalPeriod } from './BooksVolumeUserInfoRentalPeriod';
import {
    BooksVolumeUserInfoRentalPeriodFromJSON,
    BooksVolumeUserInfoRentalPeriodFromJSONTyped,
    BooksVolumeUserInfoRentalPeriodToJSON,
    BooksVolumeUserInfoRentalPeriodToJSONTyped,
} from './BooksVolumeUserInfoRentalPeriod';
import type { BooksVolumeUserInfoUserUploadedVolumeInfo } from './BooksVolumeUserInfoUserUploadedVolumeInfo';
import {
    BooksVolumeUserInfoUserUploadedVolumeInfoFromJSON,
    BooksVolumeUserInfoUserUploadedVolumeInfoFromJSONTyped,
    BooksVolumeUserInfoUserUploadedVolumeInfoToJSON,
    BooksVolumeUserInfoUserUploadedVolumeInfoToJSONTyped,
} from './BooksVolumeUserInfoUserUploadedVolumeInfo';
import type { BooksVolumeUserInfoCopy } from './BooksVolumeUserInfoCopy';
import {
    BooksVolumeUserInfoCopyFromJSON,
    BooksVolumeUserInfoCopyFromJSONTyped,
    BooksVolumeUserInfoCopyToJSON,
    BooksVolumeUserInfoCopyToJSONTyped,
} from './BooksVolumeUserInfoCopy';
import type { BooksReview } from './BooksReview';
import {
    BooksReviewFromJSON,
    BooksReviewFromJSONTyped,
    BooksReviewToJSON,
    BooksReviewToJSONTyped,
} from './BooksReview';
import type { BooksVolumeUserInfoFamilySharing } from './BooksVolumeUserInfoFamilySharing';
import {
    BooksVolumeUserInfoFamilySharingFromJSON,
    BooksVolumeUserInfoFamilySharingFromJSONTyped,
    BooksVolumeUserInfoFamilySharingToJSON,
    BooksVolumeUserInfoFamilySharingToJSONTyped,
} from './BooksVolumeUserInfoFamilySharing';
import type { BooksReadingPosition } from './BooksReadingPosition';
import {
    BooksReadingPositionFromJSON,
    BooksReadingPositionFromJSONTyped,
    BooksReadingPositionToJSON,
    BooksReadingPositionToJSONTyped,
} from './BooksReadingPosition';

/**
 * 
 * @export
 * @interface BooksVolumeUserInfo
 */
export interface BooksVolumeUserInfo {
    /**
     * AcquiredTime: Timestamp when this volume was acquired by the user. (RFC 3339
     * UTC date-time format) Acquiring includes purchase, user upload, receiving
     * family sharing, etc.
     * @type {string}
     * @memberof BooksVolumeUserInfo
     */
    acquiredTime?: string;
    /**
     * AcquisitionType: How this volume was acquired.
     * @type {number}
     * @memberof BooksVolumeUserInfo
     */
    acquisitionType?: number;
    /**
     * Copy: Copy/Paste accounting information.
     * @type {BooksVolumeUserInfoCopy}
     * @memberof BooksVolumeUserInfo
     */
    copy?: BooksVolumeUserInfoCopy;
    /**
     * EntitlementType: Whether this volume is purchased, sample, pd download etc.
     * @type {number}
     * @memberof BooksVolumeUserInfo
     */
    entitlementType?: number;
    /**
     * FamilySharing: Information on the ability to share with the family.
     * @type {BooksVolumeUserInfoFamilySharing}
     * @memberof BooksVolumeUserInfo
     */
    familySharing?: BooksVolumeUserInfoFamilySharing;
    /**
     * IsFamilySharedFromUser: Whether or not the user shared this volume with the
     * family.
     * @type {boolean}
     * @memberof BooksVolumeUserInfo
     */
    isFamilySharedFromUser?: boolean;
    /**
     * IsFamilySharedToUser: Whether or not the user received this volume through
     * family sharing.
     * @type {boolean}
     * @memberof BooksVolumeUserInfo
     */
    isFamilySharedToUser?: boolean;
    /**
     * IsFamilySharingAllowed: Deprecated: Replaced by familySharing.
     * @type {boolean}
     * @memberof BooksVolumeUserInfo
     */
    isFamilySharingAllowed?: boolean;
    /**
     * IsFamilySharingDisabledByFop: Deprecated: Replaced by familySharing.
     * @type {boolean}
     * @memberof BooksVolumeUserInfo
     */
    isFamilySharingDisabledByFop?: boolean;
    /**
     * IsInMyBooks: Whether or not this volume is currently in "my books."
     * @type {boolean}
     * @memberof BooksVolumeUserInfo
     */
    isInMyBooks?: boolean;
    /**
     * IsPreordered: Whether or not this volume was pre-ordered by the
     * authenticated user making the request. (In LITE projection.)
     * @type {boolean}
     * @memberof BooksVolumeUserInfo
     */
    isPreordered?: boolean;
    /**
     * IsPurchased: Whether or not this volume was purchased by the authenticated
     * user making the request. (In LITE projection.)
     * @type {boolean}
     * @memberof BooksVolumeUserInfo
     */
    isPurchased?: boolean;
    /**
     * IsUploaded: Whether or not this volume was user uploaded.
     * @type {boolean}
     * @memberof BooksVolumeUserInfo
     */
    isUploaded?: boolean;
    /**
     * ReadingPosition: The user's current reading position in the volume, if one
     * is available. (In LITE projection.)
     * @type {BooksReadingPosition}
     * @memberof BooksVolumeUserInfo
     */
    readingPosition?: BooksReadingPosition;
    /**
     * RentalPeriod: Period during this book is/was a valid rental.
     * @type {BooksVolumeUserInfoRentalPeriod}
     * @memberof BooksVolumeUserInfo
     */
    rentalPeriod?: BooksVolumeUserInfoRentalPeriod;
    /**
     * RentalState: Whether this book is an active or an expired rental.
     * @type {string}
     * @memberof BooksVolumeUserInfo
     */
    rentalState?: string;
    /**
     * Review: This user's review of this volume, if one exists.
     * @type {BooksReview}
     * @memberof BooksVolumeUserInfo
     */
    review?: BooksReview;
    /**
     * Updated: Timestamp when this volume was last modified by a user action, such
     * as a reading position update, volume purchase or writing a review. (RFC 3339
     * UTC date-time format).
     * @type {string}
     * @memberof BooksVolumeUserInfo
     */
    updated?: string;
    /**
     * 
     * @type {BooksVolumeUserInfoUserUploadedVolumeInfo}
     * @memberof BooksVolumeUserInfo
     */
    userUploadedVolumeInfo?: BooksVolumeUserInfoUserUploadedVolumeInfo;
}

/**
 * Check if a given object implements the BooksVolumeUserInfo interface.
 */
export function instanceOfBooksVolumeUserInfo(value: object): value is BooksVolumeUserInfo {
    return true;
}

export function BooksVolumeUserInfoFromJSON(json: any): BooksVolumeUserInfo {
    return BooksVolumeUserInfoFromJSONTyped(json, false);
}

export function BooksVolumeUserInfoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BooksVolumeUserInfo {
    if (json == null) {
        return json;
    }
    return {
        
        'acquiredTime': json['acquiredTime'] == null ? undefined : json['acquiredTime'],
        'acquisitionType': json['acquisitionType'] == null ? undefined : json['acquisitionType'],
        'copy': json['copy'] == null ? undefined : BooksVolumeUserInfoCopyFromJSON(json['copy']),
        'entitlementType': json['entitlementType'] == null ? undefined : json['entitlementType'],
        'familySharing': json['familySharing'] == null ? undefined : BooksVolumeUserInfoFamilySharingFromJSON(json['familySharing']),
        'isFamilySharedFromUser': json['isFamilySharedFromUser'] == null ? undefined : json['isFamilySharedFromUser'],
        'isFamilySharedToUser': json['isFamilySharedToUser'] == null ? undefined : json['isFamilySharedToUser'],
        'isFamilySharingAllowed': json['isFamilySharingAllowed'] == null ? undefined : json['isFamilySharingAllowed'],
        'isFamilySharingDisabledByFop': json['isFamilySharingDisabledByFop'] == null ? undefined : json['isFamilySharingDisabledByFop'],
        'isInMyBooks': json['isInMyBooks'] == null ? undefined : json['isInMyBooks'],
        'isPreordered': json['isPreordered'] == null ? undefined : json['isPreordered'],
        'isPurchased': json['isPurchased'] == null ? undefined : json['isPurchased'],
        'isUploaded': json['isUploaded'] == null ? undefined : json['isUploaded'],
        'readingPosition': json['readingPosition'] == null ? undefined : BooksReadingPositionFromJSON(json['readingPosition']),
        'rentalPeriod': json['rentalPeriod'] == null ? undefined : BooksVolumeUserInfoRentalPeriodFromJSON(json['rentalPeriod']),
        'rentalState': json['rentalState'] == null ? undefined : json['rentalState'],
        'review': json['review'] == null ? undefined : BooksReviewFromJSON(json['review']),
        'updated': json['updated'] == null ? undefined : json['updated'],
        'userUploadedVolumeInfo': json['userUploadedVolumeInfo'] == null ? undefined : BooksVolumeUserInfoUserUploadedVolumeInfoFromJSON(json['userUploadedVolumeInfo']),
    };
}

export function BooksVolumeUserInfoToJSON(json: any): BooksVolumeUserInfo {
    return BooksVolumeUserInfoToJSONTyped(json, false);
}

export function BooksVolumeUserInfoToJSONTyped(value?: BooksVolumeUserInfo | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'acquiredTime': value['acquiredTime'],
        'acquisitionType': value['acquisitionType'],
        'copy': BooksVolumeUserInfoCopyToJSON(value['copy']),
        'entitlementType': value['entitlementType'],
        'familySharing': BooksVolumeUserInfoFamilySharingToJSON(value['familySharing']),
        'isFamilySharedFromUser': value['isFamilySharedFromUser'],
        'isFamilySharedToUser': value['isFamilySharedToUser'],
        'isFamilySharingAllowed': value['isFamilySharingAllowed'],
        'isFamilySharingDisabledByFop': value['isFamilySharingDisabledByFop'],
        'isInMyBooks': value['isInMyBooks'],
        'isPreordered': value['isPreordered'],
        'isPurchased': value['isPurchased'],
        'isUploaded': value['isUploaded'],
        'readingPosition': BooksReadingPositionToJSON(value['readingPosition']),
        'rentalPeriod': BooksVolumeUserInfoRentalPeriodToJSON(value['rentalPeriod']),
        'rentalState': value['rentalState'],
        'review': BooksReviewToJSON(value['review']),
        'updated': value['updated'],
        'userUploadedVolumeInfo': BooksVolumeUserInfoUserUploadedVolumeInfoToJSON(value['userUploadedVolumeInfo']),
    };
}

