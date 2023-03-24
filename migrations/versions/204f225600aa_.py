"""empty message

Revision ID: 204f225600aa
Revises: 45e7127208a1
Create Date: 2023-03-23 17:31:22.640621

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '204f225600aa'
down_revision = '45e7127208a1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('notifications',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('other_user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['other_user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE notifications SET SCHEMA {SCHEMA};")

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('notifications')
    # ### end Alembic commands ###
