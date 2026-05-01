scoreDict = {}
with open("Z.txt") as f:
    scores = f.readlines()[0].split()
    count = 0
    for item in scores:
        if count == 0:
            idx1 = item
            scoreDict[idx1] = {}
            count += 1
        else:
            idx2 = "%d" % (count-1)
            scoreDict[idx1][idx2] = item
            count += 1
            if count == 11:
                count = 0
            
            
#for key in scoreDict:
#print(scoreDict["3.9"]["9"])

fName = "zTable.js"
f = open(fName, "w")
f.write("let zScores = {\n")
for key in scoreDict:
    f.write('\t"%s" :\n\t{\n' % (key))
    for key2 in scoreDict[key]:
        f.write('\t\t"%s" : %s,\n' % (key2, scoreDict[key][key2]))
    f.write("\t},\n")
f.write("}\n\n")
f.write("module.exports.zScoreTab = zScores")
f.close()
    
