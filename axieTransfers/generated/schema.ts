// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Axie extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Axie entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Axie must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Axie", id.toString(), this);
    }
  }

  static load(id: string): Axie | null {
    return changetype<Axie | null>(store.get("Axie", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get len(): i32 {
    let value = this.get("len");
    return value!.toI32();
  }

  set len(value: i32) {
    this.set("len", Value.fromI32(value));
  }

  get streak(): Array<string> | null {
    let value = this.get("streak");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set streak(value: Array<string> | null) {
    if (!value) {
      this.unset("streak");
    } else {
      this.set("streak", Value.fromStringArray(<Array<string>>value));
    }
  }

  get history(): Array<string> | null {
    let value = this.get("history");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set history(value: Array<string> | null) {
    if (!value) {
      this.unset("history");
    } else {
      this.set("history", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Roninuser extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Roninuser entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Roninuser must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Roninuser", id.toString(), this);
    }
  }

  static load(id: string): Roninuser | null {
    return changetype<Roninuser | null>(store.get("Roninuser", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get streak(): Array<string> | null {
    let value = this.get("streak");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set streak(value: Array<string> | null) {
    if (!value) {
      this.unset("streak");
    } else {
      this.set("streak", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class TransferStreak extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TransferStreak entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TransferStreak must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TransferStreak", id.toString(), this);
    }
  }

  static load(id: string): TransferStreak | null {
    return changetype<TransferStreak | null>(store.get("TransferStreak", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get new_owner(): string {
    let value = this.get("new_owner");
    return value!.toString();
  }

  set new_owner(value: string) {
    this.set("new_owner", Value.fromString(value));
  }

  get axie(): string {
    let value = this.get("axie");
    return value!.toString();
  }

  set axie(value: string) {
    this.set("axie", Value.fromString(value));
  }

  get txHash(): string {
    let value = this.get("txHash");
    return value!.toString();
  }

  set txHash(value: string) {
    this.set("txHash", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class StreakHistory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save StreakHistory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type StreakHistory must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("StreakHistory", id.toString(), this);
    }
  }

  static load(id: string): StreakHistory | null {
    return changetype<StreakHistory | null>(store.get("StreakHistory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get isEnded(): boolean {
    let value = this.get("isEnded");
    return value!.toBoolean();
  }

  set isEnded(value: boolean) {
    this.set("isEnded", Value.fromBoolean(value));
  }

  get len(): i32 {
    let value = this.get("len");
    return value!.toI32();
  }

  set len(value: i32) {
    this.set("len", Value.fromI32(value));
  }

  get axie(): string {
    let value = this.get("axie");
    return value!.toString();
  }

  set axie(value: string) {
    this.set("axie", Value.fromString(value));
  }
}
