
declare module dcodeIO {
	export module ProtoBuf {
		function loadProto(proto:any, builder?:any, filename?:any):Builder;
		function protoFromString(proto:any, builder?:any, filename?:any):Builder;
		function loadProtoFile(filename:any, callback?:any, builder?:Builder):Builder;
		function protoFromFile(filename:any, callback?:any, builder?:Builder):Builder;
		function newBuilder(options?:any);
		function loadJson(json:any, builder?:Builder, filename?:any):Builder;
		function loadJsonFile(filename:any, callback?:any, builder?:Builder):Builder;
		export class Builder {
			public ns:any;
			public ptr:any;
			public resolved:boolean;
			public result:any;
			public files:string[];
			public importRoot:string;
			public options:any;

			public static isMessage(def:any):boolean;
			public static isMessageField(def:any):boolean;
			public static isEnum(def:any):boolean;
			public static isService(def:any):boolean;
			public static isExtend(def):boolean;
			public reset():Builder;
			public define(namespace:string):Builder;
			public create(defs:any):Builder;
			public import(json:any, filename?:any):Builder; 
			public resolveAll():Builder;
			public build(path?:any):any;
			public lookup(path?:string, excludeNonNamespace?:boolean):any;
			public toString():string;
		}

		export class Map {
			constructor(field:Reflect.Message.Field, contents:any);
			public field:Reflect.Message.Field;
			public keyElem:Reflect.Element;
			public valueElem:Reflect.Element;
			public map:any;
			public clear():void;
			public delete(key:any):boolean;
			public entries():any;
			public keys():any;
			public values():any;
			public forEach(cb:any, thisArg:any):void;
			public set(key:any, value:any):Map;
			public get(key:any):any;
			public has(key:any):boolean;
		}

		export module Util {
			let IS_NODE:boolean;
			function XHR():XMLHttpRequest;
			function fetch(patch:string, callback?:any):string;
			function toCamelCase(str:string):string;
		}

		export module Builder {
			export class Message {
				constructor(values:any, var_args:string);
				public add(key:string, value:any, noAssert?:boolean):Message;
				public $add(key:string, value:any, noAssert?:boolean):Message;
				public set(keyOrObj:any, value?:any, noAssert?:boolean):Message;
				public $set(keyOrObj:any, value?:any, noAssert?:boolean):Message;
				public get(key:string, noAssert?:boolean):any;
				public $get(key:string, noAssert?:boolean):any;
				public encode(buffer?:any, noVerify?:boolean):ByteBuffer;
				public static encode(data:any, buffer?:any, noVerify?:boolean):ByteBuffer;
				public calculate():number;
				public encodeDelimited(buffer?:any, noVerify?:boolean):ByteBuffer;
				public encodeAB():ArrayBuffer;
				public toArrayBuffer():ArrayBuffer;
				public encodeNB():ArrayBuffer;
				public toBuffer():ArrayBuffer;
				public encode64():string;
				public toBase64():string;
				public encodeHex():string;
				public toHex():string;
				public toRaw(binaryAsBase64?:boolean, longsAsStrings?:boolean):any;
				public encodeJSON():string;
				public decode(buffer:any, length?:any, enc?:string):Message;
				public decodeDelimited(buffer:any, enc?:string):Message;
				public decode64(str:string):Message;
				public decodeHex(str:string):Message;
				public decodeJSON(str:string):Message;
				public toString():string;
			}

			export class Enum {

			}

			export class Service {
				constructor(rpcImpl?:any);
			}
		}

		export module DotProto {
			export class Parser {
				constructor(source:string);
				public tn:Tokenizer;
				public proto3:boolean;
				public parse():any;
				public static parse(source:string):any;
				public toString():string;
			}

			export class Tokenizer {
				constructor(proto:string);
				public source:string;
				public index:number;
				public line:number;
				public stack:string[];
				public next():string;
				public peek():string;
				public skip(expected:string):void;
				public omit(expected:string):boolean;
				public toString():string;
			}
		}

		export module Reflect {
			export class Element {
				constructor(type:any, resolvedType:T, isMapKey:boolean, syntax:string, name:string);
				public type:any;
				public resolvedType:T;
				public isMapKey:boolean;
				public syntax:string;
				public name:string;
				public defaultFieldValue(type:any) :any;
				public toString():string;
				public verifyValue(value:any):any;
				public calculateLength(id:number, value:any):number;
				public encodeValue(id:number, value:any, buffer:ByteBuffer):ByteBuffer;
				public decode(buffer:ByteBuffer, wireType:number, id:number):any;
				public valueFromString(str:string):any;
				public valueToString(value:any):string;
			}

			export class Enum {
				constructor(builder:Builder, parent:T, name:string, options?:any, syntax?:string);
				public className:string;
				public object:any;
				public static getName(enm:Builder.Enum, value:number):string;
				public build(rebuild:boolean):any;
			}

			export class Extension {
				constructor(builder:Builder, parent:T, name:string, field:Message.Field);
				public field:Message.Field;
			}

			export class Message {
				constructor(builder:Builder, parent:Namespace, name:string, options?:any, isGroup?:boolean, syntax?:string);
				public className:string;
				public extensions:number[];
				public clazz:any;
				public isGroup:boolean;
				public build(rebuild?:boolean):Message;
				public encode(message:Message, buffer:ByteBuffer, noVerify?:boolean):ByteBuffer;
				public calculate(message:Message):number;
				public decode(buffer:ByteBuffer, length?:number, expectedGroupEndId?:number):Message;
			}

			export class Namespace {
				constructor(builder:Builder, parent:Namespace, name:string, options?:any, syntax?:string);
				public className:string;
				public children:T[];
				public option:any;
				public syntax:string;
				public getChildren(type?:T):T[];
				public addChild(child:T):void;
				public getChild(nameOrId:any):T;
				public resolve(qn:any, excludeNonNamespace?:boolean):Namespace;
				public qn(t:T):string;
				public build():any;
				public buildOpt():any;
				public getOption(name?:string):any;
			}

			export class Service {
				constructor(builder:Builder, root:Namespace, name:string, options?:any);
				public className:string;
				public clazz:any;
				public build(rebuild?:boolean):any;
			}

			export class T {
				constructor(builder:Builder, parent:T, name:string);
				public builder:Builder;
				public parent:T;
				public name:string;
				public className:string;
				public fqn():string;
				public toString(includeClass?:boolean):string;
				public build():void;
			}

			export module Enum {
				export class Value {
					constructor(builder:Builder, enm:Reflect.Enum, name:string, id:number);
					public className:string;
					public id:number;	
				}
			}


			export module Message {
				export class ExtensionField {
					constructor(builder:Builder, message:Reflect.Message, rule:string, type:string, name:string, id:number, options?:any);
					public extension:Extension;
				}

				export class Field {
					constructor(builder:Builder, message:Reflect.Message, rule:string, keytype:string, type:string, name:string, id:number, options?:any, oneof?:Reflect.Message.OneOf, syntax?:string);
					public required:boolean;
					public repeated:boolean;
					public map:boolean;
					public keyType:any;
					public type:any;
					public resolvedType:Reflect.T;
					public id:number;
					public options:any;
					public defaultValue:any;
					public oneof:Reflect.Message.OneOf;
					public syntax:string;
					public originalName:string;
					public element:Element;
					public keyElement:Element;
					public build():void;
					public verifyValue(value:any, skipRepeated?:boolean):any;
					public hasWirePresence(value:any, message:Builder.Message):boolean;
					public encode(value:any, buffer:ByteBuffer, message:Builder.Message):ByteBuffer;
					public calculate(value:any, message:Builder.Message):number;
					public decode(wireType:number, buffer:ByteBuffer, skipRepeated?:boolean):any;
				}

				export class OneOf {
					constructor(builder:Builder, message:Reflect.Message, name:string);
					public fields:Field
				}
			}
			
			export module Service {
				export class Method {
					constructor(builder:Builder, svc:Service, name:string, options?:any);
					public className:string;
					public options:any;
				}

				export class RPCMethod {
					constructor(builder:Builder, svc:Reflect.Service, name:string, request:string, response:string, request_stream:boolean, response_stream:boolean, options:any);
					public className:string;
					public requestName:string;
					public responseName:string;
					public requestStream:boolean;
					public responseStream:boolean;
					public resolvedRequestType:Reflect.Message;
					public resolvedResponseType:Reflect.Message;
				}
			}
		}
	}
}