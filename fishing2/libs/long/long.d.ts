declare module dcodeIO {
	export class Long {
		public low:number;
		public high:number;
		public unsigned:boolean;
		constructor(low?:number, high?:number, unsigned?:boolean);
		public static fromInt(value:number, unsigned?:boolean):Long;
		public static fromNumber(value:number, unsigned?:boolean):Long;
		public static fromBits(lowBits?:number, highBits?:number, unsigned?:boolean):Long;
		public static fromString(str:string, unsigned?:any, radix?:number):Long;
		public static fromValue(val:any):Long;
		public toInt():number;
		public toNumber():number;
		public toString(radix:number):string;
		public getHighBits():number;
		public getHighBitsUnsigned():number;
		public getLowBits():number;
		public getLowBitsUnsigned():number;
		public getNumBitsAbs():number;
		public isZero():boolean;
		public isNegative():boolean;
		public isPositive():boolean;
		public isOdd():boolean;
		public isEven():boolean;
		public equals(other:any):boolean;
		public eq(other:any):boolean;
		public notEquals(other:any);
		public neq(other:any);
		public lessThan(other:any):boolean;
		public lt(other:any):boolean;
		public lessThanOrEqual(other:any):boolean;
		public lte(other:any):boolean;
		public greaterThan(other:any):boolean;
		public gt(other:any):boolean;
		public greaterThanOrEqual(other:any):boolean;
		public gte(other:any):boolean;
		public compare(other:any):number;
		public comp(other:any):number;
		public negate():Long;
		public neg():Long;
		public add(addend:any):Long;
		public subtract(subtrahend:any):Long;
		public sub(subtrahend:any):Long;
		public multiply(multiplier:any):Long;
		public mul(multiplier:any):Long;
		public divide(divisor:any):Long;
		public div(divisor:any):Long;
		public modulo(divisor:any):Long;
		public mod(divisor:any):Long;
		public not():Long;
		public and(other:any):Long;
		public or(other:any):Long;
		public xor(other:any):Long;
		public shiftLeft(numBits:any):Long;
		public shl(numBits:any):Long;
		public shiftRight(numBits:any):Long;
		public shr(numBits:any):Long;
		public shiftRightUnsigned(numBits:any):Long;
		public shru(numBits:any):Long;
		public toSigned():Long;
		public toUnsigned():Long;
		public toBytes(le:boolean):number[];
		public toBytesLE():number[];
		public toBytesBE():number[];
	}
}