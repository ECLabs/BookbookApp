/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"T33eMsfGT6F9LZLSwymtcmFngY8Tyrqk"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"AQV3NF3x4zFhCgUBokkKcGm2tcStp2XU"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"wzGRdLFcWi7uk0wug5w9lRw3Qg12jCYF"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"s6t29jOo6MzjVt3NDH2GlsovqhhH51NG"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"thJtm5jxQvJihZvb7lFemrWtuKA79awI"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"YulbfGCZbabzTnDKSGG4669O9dUQtsYD"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
