var roleFiller = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var target_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER && (structure.store.energy > 0) }});
                if (creep.withdraw(target_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target_storage, {visualizePathStyle: {stroke: "#ffffff"}});
            }
        }
        
        else {
            if(creep.carry.energy == creep.carryCapacity) {
                var target_ext = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {return structure.structureType == (STRUCTURE_SPAWN && STRUCTURE_EXTENSION) && (structure.energy < structure.energyCapacity) }});
                    if(creep.transfer(target_ext, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target_ext, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }    
        }
    }
};

module.exports = roleFiller;
