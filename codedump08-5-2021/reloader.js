var roleReloader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var target_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER}});
            if (creep.withdraw(target_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target_storage, {visualizePathStyle: {stroke: "#ffffff"}});
            }
        }
        
        else {
            var target_tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => { return structure.structureType == STRUCTURE_TOWER}});
            if (creep.transfer(target_tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target_tower, {visualizePathStyle: {stroke: "#ffffff"}});
            }
        }
    }
};

module.exports = roleReloader;
