def check_eligibility(student, drive):
    reasons = []

    if student["cgpa"] < drive["min_cgpa"]:
        reasons.append("CGPA below required minimum")

    if student["backlogs"] > drive["max_backlogs"]:
        reasons.append("Backlogs exceed allowed limit")

    if student["tenth_percent"] < drive["min_tenth_percent"]:
        reasons.append("10th percentage below required minimum")

    if student["twelfth_percent"] < drive["min_twelfth_percent"]:
        reasons.append("12th percentage below required minimum")

    allowed_branches = drive["allowed_branches"].split(",")
    if student["branch"] not in allowed_branches:
        reasons.append("Branch not allowed for this drive")

    if student["year"] < drive["min_year"]:
        reasons.append("Year not eligible for this drive")

    return reasons
