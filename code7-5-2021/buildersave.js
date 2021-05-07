var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && (creep.carry.energy == 0)) {
            creep.memory.building = false;
            creep.say('🔄 withdraw');
        }
        if(!creep.memory.building && (creep.carry.energy == creep.carryCapacity)) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building = true) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            if(creep.carry.energy < creep.carryCapacity) {
            var target_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER}});
            if (creep.withdraw(target_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target_storage, {visualizePathStyle: {stroke: "#ffffff"}});
                }
            }
        }    
        
    }
};

module.exports = roleBuilder;
