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
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES);
                if (target.hits < target.hitsMax) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            
            else {
                var target_wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => { return structure.structureType == STRUCTURE_WALL; }});
                    if(creep.repair(target_wall) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target_wall);
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
