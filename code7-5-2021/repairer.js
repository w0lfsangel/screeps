var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }
        
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }
        
        if (creep.memory.repairing) {
            var target_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER; }});
            
            if (target_storage.hits < target_storage.hitsMax) {
                if(creep.repair(target_storage) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target_storage);
                }
            }
        }
        
        else {
            var target_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER; }});
            if (creep.withdraw(target_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target_storage, {visualizePathStyle: {stroke: "#ffffff"}});
            }
        }
    }
};

module.exports = roleRepairer;