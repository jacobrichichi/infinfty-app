// Automatically generated with Reach 0.1.9 (d3fd55fe)
/* eslint-disable */
export const _version = '0.1.9';
export const _versionHash = '0.1.9 (d3fd55fe)';
export const _backendVersion = 11;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  
  return {
    infos: {
      },
    views: {
      1: [ctc0, ctc1, ctc2, ctc2, ctc2],
      4: [ctc0, ctc1, ctc2, ctc2, ctc0, ctc2, ctc2]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Bidder(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bidder expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bidder expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Token;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Null;
  const ctc3 = stdlib.T_Data({
    None: ctc2,
    Some: ctc1
    });
  const ctc4 = stdlib.T_Address;
  
  
  const txn1 = await (ctc.recv({
    didSend: false,
    evt_cnt: 3,
    funcNum: 0,
    out_tys: [ctc0, ctc1, ctc1],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [v209, v210, v211], secs: v213, time: v212, didSend: v33, from: v208 } = txn1;
  ;
  ;
  const txn2 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 1,
    out_tys: [],
    timeoutAt: undefined /* mto */,
    waitIfNotPresent: false
    }));
  const {data: [], secs: v223, time: v222, didSend: v40, from: v221 } = txn2;
  ;
  ;
  const v233 = stdlib.addressEq(v208, v221);
  stdlib.assert(v233, {
    at: './index.rsh:29:11:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Bidder'
    });
  const v235 = stdlib.add(v212, v211);
  const v237 = [v209, v210, v235];
  stdlib.protect(ctc2, await interact.seeParams(v237), {
    at: './index.rsh:32:28:application',
    fs: ['at ./index.rsh:32:28:application call to [unknown function] (defined at: ./index.rsh:32:28:function exp)', 'at ./index.rsh:32:28:application call to "liftedInteract" (defined at: ./index.rsh:32:28:application)'],
    msg: 'seeParams',
    who: 'Bidder'
    });
  
  let v238 = v210;
  let v239 = v208;
  let v240 = stdlib.checkedBigNumberify('./index.rsh:35:31:decimal', stdlib.UInt_max, 0);
  let v241 = v222;
  let v242 = v212;
  
  while (await (async () => {
    const v256 = stdlib.le(v242, v235);
    
    return v256;})()) {
    const v261 = ctc.selfAddress();
    const v263 = stdlib.addressEq(v239, v261);
    let v265;
    if (v263) {
      const v267 = ['None', null];
      v265 = v267;
      }
    else {
      const v266 = stdlib.protect(ctc3, await interact.getBid(v238), {
        at: './index.rsh:41:41:application',
        fs: ['at ./index.rsh:39:9:application call to [unknown function] (defined at: ./index.rsh:39:13:function exp)', 'at ./index.rsh:39:9:application call to [unknown function] (defined at: ./index.rsh:39:9:function exp)'],
        msg: 'getBid',
        who: 'Bidder'
        });
      v265 = v266;
      }
    let v268;
    switch (v265[0]) {
      case 'None': {
        const v269 = v265[1];
        v268 = false;
        
        break;
        }
      case 'Some': {
        const v270 = v265[1];
        const v271 = stdlib.gt(v270, v238);
        v268 = v271;
        
        break;
        }
      }
    const v272 = stdlib.fromSome(v265, stdlib.checkedBigNumberify('./index.rsh:45:34:decimal', stdlib.UInt_max, 0));
    
    const txn3 = await (ctc.sendrecv({
      args: [v208, v209, v235, v238, v239, v240, v241, v272],
      evt_cnt: 1,
      funcNum: 3,
      lct: v241,
      onlyIf: v268,
      out_tys: [ctc1],
      pay: [v272, []],
      sim_p: (async (txn3) => {
        const sim_r = { txns: [], mapRefs: [], maps: [] };
        let sim_txn_ctr = stdlib.UInt_max;
        const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
        
        
        const {data: [v275], secs: v277, time: v276, didSend: v110, from: v274 } = txn3;
        
        sim_r.txns.push({
          amt: v275,
          kind: 'to',
          tok: undefined /* Nothing */
          });
        const v281 = stdlib.gt(v275, v238);
        ;
        sim_r.txns.push({
          amt: v240,
          kind: 'from',
          to: v239,
          tok: undefined /* Nothing */
          });
        const cv238 = v275;
        const cv239 = v274;
        const cv240 = v275;
        const cv241 = v276;
        const cv242 = v241;
        
        await (async () => {
          const v238 = cv238;
          const v239 = cv239;
          const v240 = cv240;
          const v241 = cv241;
          const v242 = cv242;
          
          if (await (async () => {
            const v256 = stdlib.le(v242, v235);
            
            return v256;})()) {
            sim_r.isHalt = false;
            }
          else {
            sim_r.txns.push({
              amt: v240,
              kind: 'from',
              to: v208,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              amt: stdlib.checkedBigNumberify('./index.rsh:27:15:decimal', stdlib.UInt_max, 1),
              kind: 'from',
              to: v239,
              tok: v209
              });
            sim_r.txns.push({
              kind: 'halt',
              tok: v209
              })
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            }})();
        return sim_r;
        }),
      soloSend: false,
      timeoutAt: ['time', v235],
      tys: [ctc4, ctc0, ctc1, ctc1, ctc4, ctc1, ctc1, ctc1],
      waitIfNotPresent: false
      }));
    if (txn3.didTimeout) {
      const txn4 = await (ctc.recv({
        didSend: false,
        evt_cnt: 0,
        funcNum: 4,
        out_tys: [],
        timeoutAt: undefined /* mto */,
        waitIfNotPresent: false
        }));
      const {data: [], secs: v291, time: v290, didSend: v141, from: v289 } = txn4;
      ;
      const v292 = stdlib.addressEq(v208, v289);
      stdlib.assert(v292, {
        at: './index.rsh:57:17:dot',
        fs: ['at ./index.rsh:55:38:application call to [unknown function] (defined at: ./index.rsh:55:38:function exp)'],
        msg: 'sender correct',
        who: 'Bidder'
        });
      const cv238 = v238;
      const cv239 = v239;
      const cv240 = v240;
      const cv241 = v290;
      const cv242 = v241;
      
      v238 = cv238;
      v239 = cv239;
      v240 = cv240;
      v241 = cv241;
      v242 = cv242;
      
      continue;
      }
    else {
      const {data: [v275], secs: v277, time: v276, didSend: v110, from: v274 } = txn3;
      ;
      const v281 = stdlib.gt(v275, v238);
      stdlib.assert(v281, {
        at: './index.rsh:50:18:application',
        fs: ['at ./index.rsh:49:9:application call to [unknown function] (defined at: ./index.rsh:49:16:function exp)'],
        msg: null,
        who: 'Bidder'
        });
      ;
      const cv238 = v275;
      const cv239 = v274;
      const cv240 = v275;
      const cv241 = v276;
      const cv242 = v241;
      
      v238 = cv238;
      v239 = cv239;
      v240 = cv240;
      v241 = cv241;
      v242 = cv242;
      
      continue;}
    
    }
  ;
  ;
  stdlib.protect(ctc2, await interact.showOutcome(v239), {
    at: './index.rsh:64:53:application',
    fs: ['at ./index.rsh:64:7:application call to [unknown function] (defined at: ./index.rsh:64:30:function exp)'],
    msg: 'showOutcome',
    who: 'Bidder'
    });
  
  return;
  
  
  
  
  };
export async function Creator(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Creator expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Creator expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Token;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Tuple([ctc0, ctc1, ctc1]);
  const ctc3 = stdlib.T_Null;
  const ctc4 = stdlib.T_Address;
  
  
  const v204 = stdlib.protect(ctc2, await interact.getSale(), {
    at: './index.rsh:24:77:application',
    fs: ['at ./index.rsh:23:15:application call to [unknown function] (defined at: ./index.rsh:23:19:function exp)'],
    msg: 'getSale',
    who: 'Creator'
    });
  const v205 = v204[stdlib.checkedBigNumberify('./index.rsh:24:11:array', stdlib.UInt_max, 0)];
  const v206 = v204[stdlib.checkedBigNumberify('./index.rsh:24:11:array', stdlib.UInt_max, 1)];
  const v207 = v204[stdlib.checkedBigNumberify('./index.rsh:24:11:array', stdlib.UInt_max, 2)];
  
  const txn1 = await (ctc.sendrecv({
    args: [v205, v206, v207],
    evt_cnt: 3,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:26:11:dot', stdlib.UInt_max, 0),
    onlyIf: true,
    out_tys: [ctc0, ctc1, ctc1],
    pay: [stdlib.checkedBigNumberify('./index.rsh:26:11:decimal', stdlib.UInt_max, 0), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v209, v210, v211], secs: v213, time: v212, didSend: v33, from: v208 } = txn1;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
        kind: 'init',
        tok: v209
        });
      ;
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc1],
    waitIfNotPresent: false
    }));
  const {data: [v209, v210, v211], secs: v213, time: v212, didSend: v33, from: v208 } = txn1;
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v208, v209, v210, v211, v212],
    evt_cnt: 0,
    funcNum: 1,
    lct: v212,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./index.rsh:29:11:dot', stdlib.UInt_max, 0), [[stdlib.checkedBigNumberify('./index.rsh:27:15:decimal', stdlib.UInt_max, 1), v209]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v223, time: v222, didSend: v40, from: v221 } = txn2;
      
      ;
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./index.rsh:27:15:decimal', stdlib.UInt_max, 1),
        kind: 'to',
        tok: v209
        });
      const v233 = stdlib.addressEq(v208, v221);
      ;
      const v235 = stdlib.add(v212, v211);
      const v238 = v210;
      const v239 = v208;
      const v240 = stdlib.checkedBigNumberify('./index.rsh:35:31:decimal', stdlib.UInt_max, 0);
      const v241 = v222;
      const v242 = v212;
      
      if (await (async () => {
        const v256 = stdlib.le(v242, v235);
        
        return v256;})()) {
        sim_r.isHalt = false;
        }
      else {
        sim_r.txns.push({
          amt: v240,
          kind: 'from',
          to: v208,
          tok: undefined /* Nothing */
          });
        sim_r.txns.push({
          amt: stdlib.checkedBigNumberify('./index.rsh:27:15:decimal', stdlib.UInt_max, 1),
          kind: 'from',
          to: v239,
          tok: v209
          });
        sim_r.txns.push({
          kind: 'halt',
          tok: v209
          })
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc4, ctc0, ctc1, ctc1, ctc1],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v223, time: v222, didSend: v40, from: v221 } = txn2;
  ;
  ;
  const v233 = stdlib.addressEq(v208, v221);
  stdlib.assert(v233, {
    at: './index.rsh:29:11:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Creator'
    });
  const v235 = stdlib.add(v212, v211);
  let v238 = v210;
  let v239 = v208;
  let v240 = stdlib.checkedBigNumberify('./index.rsh:35:31:decimal', stdlib.UInt_max, 0);
  let v241 = v222;
  let v242 = v212;
  
  while (await (async () => {
    const v256 = stdlib.le(v242, v235);
    
    return v256;})()) {
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 3,
      out_tys: [ctc1],
      timeoutAt: ['time', v235],
      waitIfNotPresent: false
      }));
    if (txn3.didTimeout) {
      stdlib.protect(ctc3, await interact.timeout(), {
        at: './index.rsh:56:33:application',
        fs: ['at ./index.rsh:56:33:application call to [unknown function] (defined at: ./index.rsh:56:33:function exp)', 'at ./index.rsh:56:33:application call to "liftedInteract" (defined at: ./index.rsh:56:33:application)', 'at ./index.rsh:55:38:application call to [unknown function] (defined at: ./index.rsh:55:38:function exp)'],
        msg: 'timeout',
        who: 'Creator'
        });
      
      const txn4 = await (ctc.sendrecv({
        args: [v208, v209, v235, v238, v239, v240, v241],
        evt_cnt: 0,
        funcNum: 4,
        lct: v241,
        onlyIf: true,
        out_tys: [],
        pay: [stdlib.checkedBigNumberify('./index.rsh:57:17:decimal', stdlib.UInt_max, 0), []],
        sim_p: (async (txn4) => {
          const sim_r = { txns: [], mapRefs: [], maps: [] };
          let sim_txn_ctr = stdlib.UInt_max;
          const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
          
          
          const {data: [], secs: v291, time: v290, didSend: v141, from: v289 } = txn4;
          
          ;
          const v292 = stdlib.addressEq(v208, v289);
          ;
          const cv238 = v238;
          const cv239 = v239;
          const cv240 = v240;
          const cv241 = v290;
          const cv242 = v241;
          
          await (async () => {
            const v238 = cv238;
            const v239 = cv239;
            const v240 = cv240;
            const v241 = cv241;
            const v242 = cv242;
            
            if (await (async () => {
              const v256 = stdlib.le(v242, v235);
              
              return v256;})()) {
              sim_r.isHalt = false;
              }
            else {
              sim_r.txns.push({
                amt: v240,
                kind: 'from',
                to: v208,
                tok: undefined /* Nothing */
                });
              sim_r.txns.push({
                amt: stdlib.checkedBigNumberify('./index.rsh:27:15:decimal', stdlib.UInt_max, 1),
                kind: 'from',
                to: v239,
                tok: v209
                });
              sim_r.txns.push({
                kind: 'halt',
                tok: v209
                })
              sim_r.txns.push({
                kind: 'halt',
                tok: undefined /* Nothing */
                })
              sim_r.isHalt = true;
              }})();
          return sim_r;
          }),
        soloSend: true,
        timeoutAt: undefined /* mto */,
        tys: [ctc4, ctc0, ctc1, ctc1, ctc4, ctc1, ctc1],
        waitIfNotPresent: false
        }));
      const {data: [], secs: v291, time: v290, didSend: v141, from: v289 } = txn4;
      ;
      const v292 = stdlib.addressEq(v208, v289);
      stdlib.assert(v292, {
        at: './index.rsh:57:17:dot',
        fs: ['at ./index.rsh:55:38:application call to [unknown function] (defined at: ./index.rsh:55:38:function exp)'],
        msg: 'sender correct',
        who: 'Creator'
        });
      const cv238 = v238;
      const cv239 = v239;
      const cv240 = v240;
      const cv241 = v290;
      const cv242 = v241;
      
      v238 = cv238;
      v239 = cv239;
      v240 = cv240;
      v241 = cv241;
      v242 = cv242;
      
      continue;
      }
    else {
      const {data: [v275], secs: v277, time: v276, didSend: v110, from: v274 } = txn3;
      ;
      const v281 = stdlib.gt(v275, v238);
      stdlib.assert(v281, {
        at: './index.rsh:50:18:application',
        fs: ['at ./index.rsh:49:9:application call to [unknown function] (defined at: ./index.rsh:49:16:function exp)'],
        msg: null,
        who: 'Creator'
        });
      ;
      stdlib.protect(ctc3, await interact.seeBid(v274, v275), {
        at: './index.rsh:52:34:application',
        fs: ['at ./index.rsh:52:34:application call to [unknown function] (defined at: ./index.rsh:52:34:function exp)', 'at ./index.rsh:52:34:application call to "liftedInteract" (defined at: ./index.rsh:52:34:application)', 'at ./index.rsh:49:9:application call to [unknown function] (defined at: ./index.rsh:49:16:function exp)'],
        msg: 'seeBid',
        who: 'Creator'
        });
      
      const cv238 = v275;
      const cv239 = v274;
      const cv240 = v275;
      const cv241 = v276;
      const cv242 = v241;
      
      v238 = cv238;
      v239 = cv239;
      v240 = cv240;
      v241 = cv241;
      v242 = cv242;
      
      continue;}
    
    }
  ;
  ;
  stdlib.protect(ctc3, await interact.showOutcome(v239), {
    at: './index.rsh:64:53:application',
    fs: ['at ./index.rsh:64:7:application call to [unknown function] (defined at: ./index.rsh:64:30:function exp)'],
    msg: 'showOutcome',
    who: 'Creator'
    });
  
  return;
  
  
  
  
  };
const _ALGO = {
  ABI: {
    impure: [],
    pure: [],
    sigs: []
    },
  appApproval: `BiAKAAEEKCAwCFhgoI0GJgIBAAAiNQAxGEECoSlkSSJbNQEhBls1AjYaABdJQQAHIjUEIzUGADYaAhc1BDYaAzYaARdJgQMMQADOSSQMQABXJBJEJDQBEkQ0BEkiEkw0AhIRRChkSTUDSVcAIDX/JVs1/oAEkSc087AyBjT+D0Q0/zEAEkQ0/zQDIQRbNP40AyEFWzQDVzggNAMhB1syBjQDIQhbQgFFSCQ0ARJENARJIhJMNAISEUQoZEk1AyVbNf9JNQUXNf6ABNQMbNY0/hZQsDIGNP8MRDT+iAHoNP40AyEFWw1EsSKyATQDIQdbsggjshA0A1c4ILIHszQDVwAgNAMhBFs0/zT+MQA0/jIGNAMhCFtCANRJIwxAAFYjEkQjNAESRDQESSISTDQCEhFEKGRJNQNJSVcAIDX/IQRbNf6BOFs1/YAEmouRdLAjNP6IAYk0/zEAEkQ0/zT+NP00AyEFWwg0AyVbNP8iMgY0/UIAeEgiNAESRDQESSISTDQCEhFESTUFSUkiWzX/IQZbNf6BEFs1/YAE93ETTTT/FlA0/hZQNP0WULAhCYgBFSEJiAEQsSKyASKyEiSyEDIKshQ0/7IRszEANP8WUDT+FlA0/RZQMgYWUChLAVcAQGdIIzUBMgY1AkIAnDX/Nf41/TX8Nfs1+jX5Nfg0/zT6DkEAKzT4NPkWUDT6FlA0+xZQNPxQNP0WUDT+FlAoSwFXAGhnSCQ1ATIGNQJCAFmxIrIBNP2yCCOyEDT4sgezsSKyASOyEiSyEDT8shQ0+bIRs7EisgEishIkshAyCbIVMgqyFDT5shGzQgAAMRmBBRJEsSKyASKyCCOyEDIJsgkyCrIHs0IABTEZIhJEKTQBFjQCFlBnNAZBAAqABBUffHU0B1CwNABJIwgyBBJEMRYSRCNDMRkiEkRC/98iNQEiNQJC/8M0AElKIwg1ADgHMgoSRDgQIxJEOAgSRIk0AElKSSMINQA4FDIKEkQ4ECQSRDgRTwISRDgSEkSJ`,
  appClear: `Bg==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 104,
  unsupported: [],
  version: 10,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v209",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v210",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v211",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v209",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v210",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v211",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v275",
                "type": "uint256"
              }
            ],
            "internalType": "struct T9",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T10",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e3",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e4",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m1",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v275",
                "type": "uint256"
              }
            ],
            "internalType": "struct T9",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T10",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m3",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T7",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m4",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x60806040526040516200129e3803806200129e833981016040819052620000269162000282565b6000805543600355604080518251815260208084015180516001600160a01b0316828401529081015182840152820151606082015290517f09dcf99bab8403f2ad96a278879a2e333122fff3ae5cb4798f3c3ab7f7b0fece9181900360800190a162000095341560076200017b565b620000da6040518060a0016040528060006001600160a01b0316815260200160006001600160a01b031681526020016000815260200160008152602001600081525090565b3380825260208381018051516001600160a01b039081168386019081528251840151604080880191825293518401516060808901918252436080808b0182815260016000819055929092558751808a019a909a5294519095168887015291519187019190915251908501525160a0808501919091528151808503909101815260c09093019052815162000172926002920190620001a5565b5050506200036b565b81620001a15760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b828054620001b3906200032e565b90600052602060002090601f016020900481019282620001d7576000855562000222565b82601f10620001f257805160ff191683800117855562000222565b8280016001018555821562000222579182015b828111156200022257825182559160200191906001019062000205565b506200023092915062000234565b5090565b5b8082111562000230576000815560010162000235565b604051606081016001600160401b03811182821017156200027c57634e487b7160e01b600052604160045260246000fd5b60405290565b600081830360808112156200029657600080fd5b604080519081016001600160401b0381118282101715620002c757634e487b7160e01b600052604160045260246000fd5b604052835181526060601f1983011215620002e157600080fd5b620002eb6200024b565b60208501519092506001600160a01b03811681146200030957600080fd5b8252604084810151602080850191909152606090950151908301529283015250919050565b600181811c908216806200034357607f821691505b602082108114156200036557634e487b7160e01b600052602260045260246000fd5b50919050565b610f23806200037b6000396000f3fe6080604052600436106100565760003560e01c80631e93b0f11461005f5780632c10a159146100835780638323075714610096578063a7661d54146100ab578063ab53f2c6146100be578063f4cedab0146100e157005b3661005d57005b005b34801561006b57600080fd5b506003545b6040519081526020015b60405180910390f35b61005d610091366004610c55565b6100f4565b3480156100a257600080fd5b50600154610070565b61005d6100b9366004610c55565b6102c9565b3480156100ca57600080fd5b506100d361047f565b60405161007a929190610ca1565b61005d6100ef366004610c55565b61051c565b610104600160005414600b610713565b61011e8135158061011757506001548235145b600c610713565b60008080556002805461013090610cdb565b80601f016020809104026020016040519081016040528092919081815260200182805461015c90610cdb565b80156101a95780601f1061017e576101008083540402835291602001916101a9565b820191906000526020600020905b81548152906001019060200180831161018c57829003601f168201915b50505050508060200190518101906101c19190610d2c565b90507f79ca1a789d797004bc78dff9632d64e202e102f2d008dcc20c5a645ef7d4a7d1826040516101f29190610dc4565b60405180910390a161020634156008610713565b610220610219338360200151600161073d565b6009610713565b8051610238906001600160a01b03163314600a610713565b610240610b20565b815181516001600160a01b03918216905260208084015183519216910152606082015160808301516102729190610de9565b8151604090810191909152828101516020808401805192909252845182516001600160a01b0390911691015280516000920191909152805143606090910152608080840151915101526102c481610755565b505050565b6102d96004600054146014610713565b6102f3813515806102ec57506001548235145b6015610713565b60008080556002805461030590610cdb565b80601f016020809104026020016040519081016040528092919081815260200182805461033190610cdb565b801561037e5780601f106103535761010080835404028352916020019161037e565b820191906000526020600020905b81548152906001019060200180831161036157829003601f168201915b50505050508060200190518101906103969190610e0f565b90506103aa81604001514310156016610713565b7fbe072b3e7ff68f92e7d9d05168a4666cd1ba2609e77c14d9feaf0d14991875d1826040516103d99190610dc4565b60405180910390a16103ed34156012610713565b8051610405906001600160a01b031633146013610713565b61040d610b20565b815181516001600160a01b039182169052602080840151835190831690820152604080850151845182015260608086015183860180519190915260808088015182519616959094019490945260a086015184519092019190915282514391015260c0840151915101526102c481610755565b60006060600054600280805461049490610cdb565b80601f01602080910402602001604051908101604052809291908181526020018280546104c090610cdb565b801561050d5780601f106104e25761010080835404028352916020019161050d565b820191906000526020600020905b8154815290600101906020018083116104f057829003601f168201915b50505050509050915091509091565b61052c600460005414600f610713565b6105468135158061053f57506001548235145b6010610713565b60008080556002805461055890610cdb565b80601f016020809104026020016040519081016040528092919081815260200182805461058490610cdb565b80156105d15780601f106105a6576101008083540402835291602001916105d1565b820191906000526020600020905b8154815290600101906020018083116105b457829003601f168201915b50505050508060200190518101906105e99190610e0f565b90506105fc816040015143106011610713565b6040805183358152602080850135908201527fb586755d90ded52ac0645858b09d27f42fbe59c32320b3b1d760dd0397cb5714910160405180910390a161064a34602084013514600d610713565b606081015161066090602084013511600e610713565b80608001516001600160a01b03166108fc8260a001519081150290604051600060405180830381858888f193505050501580156106a1573d6000803e3d6000fd5b506106aa610b20565b815181516001600160a01b039182169052602080840151835192169181019190915260408084015183518201528183018051868401359081905281513394019390935280519091019190915280514360609091015260c08301519051608001526102c481610755565b816107395760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b5050565b600061074b83853085610926565b90505b9392505050565b805160400151602082015160800151116108ad576107c46040518060e0016040528060006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016000815260200160006001600160a01b0316815260200160008152602001600081525090565b8151516001600160a01b039081168252825160209081015182168184015283516040908101518185015281850180515160608087019190915281518401519094166080860152805182015160a0860152519092015160c084015260046000554360015590516108899183910181516001600160a01b03908116825260208084015182169083015260408084015190830152606080840151908301526080808401519091169082015260a0828101519082015260c0918201519181019190915260e00190565b604051602081830303815290604052600290805190602001906102c4929190610b6e565b805151602082015160409081015190516001600160a01b039092169181156108fc0291906000818181858888f193505050501580156108f0573d6000803e3d6000fd5b5061090d8160000151602001518260200151602001516001610a00565b6000808055600181905561092390600290610bf2565b50565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17905291516000928392839291891691839161098d91610eb4565b60006040518083038185875af1925050503d80600081146109ca576040519150601f19603f3d011682016040523d82523d6000602084013e6109cf565b606091505b50915091506109e082826001610a14565b50808060200190518101906109f59190610ed0565b979650505050505050565b610a0b838383610a4f565b6102c457600080fd5b60608315610a2357508161074e565b825115610a335782518084602001fd5b60405163100960cb60e01b815260048101839052602401610730565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b179052915160009283928392918816918391610aae91610eb4565b60006040518083038185875af1925050503d8060008114610aeb576040519150601f19603f3d011682016040523d82523d6000602084013e610af0565b606091505b5091509150610b0182826002610a14565b5080806020019051810190610b169190610ed0565b9695505050505050565b6040805160a080820183526000828401818152606080850183905260808086018490529185528551938401865282845260208481018490529584018390528301829052820152909182015290565b828054610b7a90610cdb565b90600052602060002090601f016020900481019282610b9c5760008555610be2565b82601f10610bb557805160ff1916838001178555610be2565b82800160010185558215610be2579182015b82811115610be2578251825591602001919060010190610bc7565b50610bee929150610c28565b5090565b508054610bfe90610cdb565b6000825580601f10610c0e575050565b601f01602090049060005260206000209081019061092391905b5b80821115610bee5760008155600101610c29565b600060408284031215610c4f57600080fd5b50919050565b600060408284031215610c6757600080fd5b61074e8383610c3d565b60005b83811015610c8c578181015183820152602001610c74565b83811115610c9b576000848401525b50505050565b8281526040602082015260008251806040840152610cc6816060850160208701610c71565b601f01601f1916919091016060019392505050565b600181811c90821680610cef57607f821691505b60208210811415610c4f57634e487b7160e01b600052602260045260246000fd5b80516001600160a01b0381168114610d2757600080fd5b919050565b600060a08284031215610d3e57600080fd5b60405160a0810181811067ffffffffffffffff82111715610d6f57634e487b7160e01b600052604160045260246000fd5b604052610d7b83610d10565b8152610d8960208401610d10565b60208201526040830151604082015260608301516060820152608083015160808201528091505092915050565b801515811461092357600080fd5b81358152604081016020830135610dda81610db6565b80151560208401525092915050565b60008219821115610e0a57634e487b7160e01b600052601160045260246000fd5b500190565b600060e08284031215610e2157600080fd5b60405160e0810181811067ffffffffffffffff82111715610e5257634e487b7160e01b600052604160045260246000fd5b604052610e5e83610d10565b8152610e6c60208401610d10565b60208201526040830151604082015260608301516060820152610e9160808401610d10565b608082015260a083015160a082015260c083015160c08201528091505092915050565b60008251610ec6818460208701610c71565b9190910192915050565b600060208284031215610ee257600080fd5b815161074e81610db656fea2646970667358221220dc53f08fbc879a4f9ba7f56ec42253db9fdf6dd7ddd46ef53be6f68da7c38dc664736f6c634300080c0033`,
  BytecodeLen: 4766,
  Which: `oD`,
  version: 6,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './index.rsh:28:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './index.rsh:62:11:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  4: {
    at: './index.rsh:35:19:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Bidder": Bidder,
  "Creator": Creator
  };
export const _APIs = {
  };
