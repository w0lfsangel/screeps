var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var target_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER; }});
            if (creep.transfer(target_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target_storage, {visualizePathStyle: {stroke: "#ffffff"}});
            }
        }
    }
};

module.exports = roleHarvester;
