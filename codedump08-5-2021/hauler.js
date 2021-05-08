var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity) {
            var target_storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => { return structure.structureType == STRUCTURE_CONTAINER; }});
                if (creep.withdraw(target_storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target_storage, {visualizePathStyle: {stroke: "#ffffff"}});
            }
        }
        
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
    }
};

module.exports = roleHauler;
