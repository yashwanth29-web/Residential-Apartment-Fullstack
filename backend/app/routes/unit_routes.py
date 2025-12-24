from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.unit import Unit
from app.models.user import User
from app.models.tower import Tower

unit_bp = Blueprint("unit", __name__, url_prefix="/api/admin/units")
@unit_bp.route("", methods=["POST"])
@jwt_required()
def create_unit():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if user.role != "admin":
        return jsonify({"message": "Admin access required"}), 403

    data = request.json

    tower_id = data.get("tower_id")
    if tower_id is None:
        return jsonify({"message": "tower_id is required"}), 400
    tower = Tower.query.get(tower_id)
    if not tower:
        return jsonify({"message": "Tower not found"}), 404

    unit = Unit(
        flat_number=data["flat_number"],
        rent=data["rent"],
        tower_id=tower_id,
        image=data.get("image")   
    )

    db.session.add(unit)
    db.session.commit()

    return jsonify({"message": "Unit created successfully"})
@unit_bp.route("", methods=["GET"])

def get_units():
    units = Unit.query.all()

    result = []
    for u in units:
        result.append({
            "id": u.id,
            "flat_number": u.flat_number,
            "rent": u.rent,
            "status": u.status,
            "tower_id": u.tower_id,
            "image": u.image   # ✅ NEW
        })

    return jsonify(result)
@unit_bp.route("/<int:unit_id>", methods=["PUT"])
@jwt_required()
def update_unit(unit_id):
    unit = Unit.query.get(unit_id)
    data = request.json

    unit.rent = data.get("rent", unit.rent)
    unit.status = data.get("status", unit.status)

    db.session.commit()
    return jsonify({"message": "Unit updated"})
@unit_bp.route("/<int:unit_id>", methods=["DELETE"])
@jwt_required()
def delete_unit(unit_id):
    unit = Unit.query.get(unit_id)

    db.session.delete(unit)
    db.session.commit()

    return jsonify({"message": "Unit deleted"})


