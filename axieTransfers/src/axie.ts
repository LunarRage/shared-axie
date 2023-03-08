import { BigInt, Bytes,log} from "@graphprotocol/graph-ts"
import { axie, Transfer } from "../generated/axie/axie"
import { Axie, Roninuser, StreakHistory, TransferStreak} from "../generated/schema"

const HISTORY = "History";

export function handleTransfer(event: Transfer): void {
  let axieID = event.params._tokenId.toString();
  let currentOwner = event.params._from.toHexString();
  let newOwner = event.params._to.toHexString();

  if(filterBlock(event)){
    if(filterOnlyTransfers(event)){
      let isAxie = registerAxie(axieID);
      registerRonin(currentOwner);
      registerRonin(newOwner);
  
      if(isAxie){
        let historySize = 0;
        let streakSize = 0; 
        registerStreakHistory(axieID,historySize);
        registerTransferStreak(axieID,currentOwner,historySize,streakSize,event);
        increaseStreakHistory(axieID,historySize);
        registerTransferStreak(axieID,newOwner,historySize,streakSize+1,event);
        return;
      }
      
      let historyIndex = getAxieHistorySize(axieID);
      let streakCount = getStreakIndex(axieID);
      if(isStreakOpen(axieID)){
        if(historyIndex !== -1 && streakCount !== -1){
          registerTransferStreak(axieID,newOwner,historyIndex,streakCount+1,event);
          increaseStreakHistory(axieID,historyIndex);
          return;
        }
      }else{
        if(historyIndex !== -1 && streakCount !== -1){
          historyIndex = historyIndex +1;
          streakCount = 0;
          increaseAxieHistorySize(axieID);
          registerStreakHistory(axieID,historyIndex);
          registerTransferStreak(axieID,newOwner,historyIndex,streakCount,event);
          increaseStreakHistory(axieID,historyIndex);
          registerTransferStreak(axieID,newOwner,historyIndex,streakCount+1,event);
        }
  
      }
    }
  
    if(isAxieRegistered(axieID)){
      breakStreak(axieID);
    }
  }



}

function filterOnlyTransfers(event:Transfer):bool{
  let funcHeader = changetype < Bytes >(event.transaction.input.subarray(0,4));
  const TRANSFER_H = new Set<string>();

  TRANSFER_H.add('0x42842e0e');
  TRANSFER_H.add('0x23b872dd');
  TRANSFER_H.add('0xd56ad454');
  TRANSFER_H.add('0xf9fd92b9');
  

  return TRANSFER_H.has(funcHeader.toHexString());
}

function filterBlock(event:Transfer):bool{
  const block = BigInt.fromString('21748607');
  let curBlock = event.block.number;

  if(curBlock.le(block)){
    return true;
  }
  return false;

}

function registerAxie(axieID: string):Axie|null{
  let newAxie = Axie.load(axieID);

  if(newAxie){
    return null;
  }

  newAxie = new Axie(axieID);
  newAxie.len = 0;
  newAxie.save();
  return newAxie;
}

function registerRonin(axieID: string):Roninuser|null{
  let newRonin = Roninuser.load(axieID);

  if(newRonin){
    return null;
  }

  newRonin = new Roninuser(axieID);
  newRonin.save();
  return newRonin;
}


function registerStreakHistory(axieID:string,index:i32):StreakHistory|null{
  let id = axieID.concat(':').concat(index.toString()).concat(':').concat(HISTORY);
  let newHistory = StreakHistory.load(id);

  if(newHistory){
    return null;
  }

  newHistory = new StreakHistory(id);
  newHistory.isEnded = false;
  newHistory.axie = axieID;
  newHistory.len = 0;
  newHistory.save();
  return newHistory;
}

function registerTransferStreak(axieID:string, user:string, history:i32, index:i32,event:Transfer):TransferStreak|null{
  let id = axieID.concat(':').concat(`:${history.toString()}`).concat(`:${index.toString()}`);
  let newStreak = TransferStreak.load(id);

  if(newStreak){
    return null;
  }

  newStreak = new TransferStreak(id);
  newStreak.new_owner = user;
  newStreak.axie = axieID;
  newStreak.txHash = event.transaction.hash.toHexString();
  newStreak.timestamp = event.block.timestamp;
  newStreak.save();
  return newStreak;
}

function isStreakOpen(axieID:string):bool{
  let axieData = Axie.load(axieID);

  if(!axieData){
    log.critical("Failure Finding Axie Information: {}",[axieID]);
    return false;
  }

  let index = axieData.len;
  let id = axieID.concat(":").concat(index.toString()).concat(":").concat(HISTORY);
  let history = StreakHistory.load(id);
  
  if(!history){
    log.critical("Failure Finding Axie History Information: {}",[axieID]);
    return false;
  } 

  return !history.isEnded;
    
}

function getAxieHistorySize(axieID:string):i32{
  let axie = Axie.load(axieID);

  if(axie){
    let axIndex = axie.len;
    return axIndex;
  }

  return -1;
}

function getStreakIndex(axieID:string):i32{
  let axie = Axie.load(axieID);

  if(axie){
    let axIndex = axie.len;
    let id = axieID.concat(":").concat(axIndex.toString()).concat(":").concat(HISTORY);
    let history = StreakHistory.load(id);
    if(history){
      return history.len
    }
  }

  return -1;
}

function increaseStreakHistory(axieID:string,axIndex:i32):void{
  let axie = Axie.load(axieID);

  if(axie){
    let id = axieID.concat(":").concat(axIndex.toString()).concat(":").concat(HISTORY);
    let history = StreakHistory.load(id);
    if(history){
      let curr = history.len;
      let newVal = curr+1;
      history.len = newVal;
      history.save();
      return;
    }
  }
}

function increaseAxieHistorySize(axieID:string):void{
  let oldAxie = Axie.load(axieID);

  if(oldAxie){
    let index = oldAxie.len;
    let newVal = index +1;
    oldAxie.len = newVal;
    oldAxie.save();
    return;
  }
}

function isAxieRegistered(axieID:string):bool{
  let axie = Axie.load(axieID);

  if(axie){
    return true
  }
  return false;

}

function breakStreak(axieID:string):void{
  let oldAxie = Axie.load(axieID);

  if(oldAxie){
    let historyIndex = oldAxie.len;
    let id = axieID.concat(":").concat(historyIndex.toString()).concat(":").concat(HISTORY);
    let axieHistory = StreakHistory.load(id);
    if(axieHistory){
      axieHistory.isEnded = true;
      axieHistory.save();
      return;
    }
  }
}