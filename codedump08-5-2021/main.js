var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleHauler = require('role.hauler');
var roleReloader = require('role.reloader');
var roleFiller = require('role.filler');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var tower = Game.getObjectById('609506745aa17b2275b05de4');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER && (structure.hits < structure.hitsMax)}});
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    console.log('Haulers: ' + haulers.length);
    
    if(haulers.length == 10) {
        var newName = "Hauler" + Game.time;
        console.log('Spawning new hauler: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE], newName, 
            {memory: {role: 'hauler'}});
    }
    
    var fillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'filler');
    console.log('Fillers: ' + fillers.length);
    
    if(fillers.length < 1) {
        var newName = 'Filler' + Game.time;
        console.log('Spawning new filler: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,MOVE], newName,
            {memory: {role: 'filler'}});
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    
    if(upgraders.length < 2) {
        var newName = "Upgrader" + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    if(builders.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers: ' + repairers.length);

    if(repairers.length == 1) {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'repairer'}});
    }
    
    var reloaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'reloader');
    console.log('Reloaders: ' + reloaders.length);
    
    if(reloaders.length < 1) {
        var newName = 'Reloader' + Game.time;
        console.log('Spawning new reloader' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'reloader'}});
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    
    if(Game.cpu.bucket == 10000) {
    Game.cpu.generatePixel();
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'reloader') {
            roleReloader.run(creep);
        }
        if(creep.memory.role == 'filler') {
            roleFiller.run(creep);
        }
    }
}
